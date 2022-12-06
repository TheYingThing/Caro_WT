package controllers

import akka.actor._
import akka.stream.Materializer
import caro.Caro
import caro.controller.controllerComponent.ControllerInterface
import caro.model.gridComponent.{BoardInterface, PlayerInterface}
import caro.model.gridComponent.boardFullImpl.Player
import caro.util.Observer
import com.google.inject.Inject
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.streams.ActorFlow

import javax.inject._
import scala.Array.ofDim
import scala.util.parsing.json.JSONObject

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents)(implicit system: ActorSystem, mat: Materializer) extends BaseController {

  val controller: ControllerInterface = Caro.controller

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  /**
   * Puts tile of given color in specified slot
   *
   * @param color color as String
   * @param row   row index as Int
   * @param col   col index as Int
   * @return
   */
  def put(row: Int, col: Int, color: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.putCell(row + 2, col + 2, color)
    Ok(views.html.caro.board(this))
  }

  /**
   * Undo last move
   *
   * @return
   */
  def undo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.undo()
    Ok(views.html.caro.board(this))
  }

  /**
   * Redo last undone move
   *
   * @return
   */
  def redo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.redo()
    Ok(views.html.caro.board(this))
  }

  /**
   * Save board
   *
   * @return
   */
  def save(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.save()
    Ok(views.html.caro.board(this))
  }

  /**
   * Load saved board
   *
   * @return
   */
  def load(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.load()
    Ok(views.html.caro.board(this))
  }

  /**
   * Change player1 name
   *
   * @param name Player name as String
   * @return
   */
  def player1(name: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.newBoard(name, controller.getPlayerTwoName)
    Ok(views.html.caro.board(this))
  }

  /**
   * Change player2 name
   *
   * @param name Player name as String
   * @return
   */
  def player2(name: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.newBoard(controller.getPlayerOneName, name)
    Ok(views.html.caro.board(this))
  }

  def rules(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.caro.rules())
  }

  def board(): Action[AnyContent] = Action {
    Ok(views.html.caro.board(this))
  }

  def boardThroughMain(): Action[AnyContent] = Action {
    Ok(views.html.main("hey")(views.html.caro.board(this)))
  }

  def score(): Action[AnyContent] = Action {
    Ok(views.html.caro.score(this))
  }

  def newGame(): Action[AnyContent] = Action {
    controller.newBoard(controller.getPlayerOneName, controller.getPlayerTwoName)
    Ok(views.html.caro.newgame())
  }

  def startGame(player1: String, player2: String): Action[AnyContent] = Action {
    controller.newBoard(player1, player2)
    Ok("new board")
  }

  def allRules(row: Int, col: Int, color: String): Action[AnyContent] = Action {
    Ok(controller.getBoard().allRules(row, col, color).toString)
  }

  def helloWhaddup(): Action[AnyContent] = Action {
    Ok(views.html.caro.partials.hoho())
  }

  def putOnly(row: Int, col: Int, color: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    var player: String = "p1"

    controller.putCell(row, col, color)
    var tiles: Int = controller.getBoard().getPlayerOne.getTiles(color)
    val fieldColor: String = controller.getCellColor(row, col)
    val statusMessage: String = controller.getBoardStatus

    if (controller.getBoard().getMoves % 2 == 0) {
      player = "p2"
      tiles = controller.getBoard().getPlayerTwo.getTiles(color)
    }

    val points1: Int = controller.getBoard().getPlayerOne.getPoints
    val points2: Int = controller.getBoard().getPlayerTwo.getPoints
    Ok(Json.obj(
      "color" -> fieldColor,
      "status" -> statusMessage,
      "player" -> player,
      "pointsP1" -> points1,
      "pointsP2" -> points2,
      "tiles" -> tiles
    ))
  }

  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef { out =>
      println("Connect received")
      CaroWebSocketActorFactory.create(out)
    }
  }

  object CaroWebSocketActorFactory {
    def create(out: ActorRef) = {
      Props(new CaroWebSocketActor(out))
    }
  }

  class CaroWebSocketActor(out: ActorRef) extends Actor with Observer {
    controller.add(this)

    override def receive: Receive = {
      case msg: String =>
        val json = Json.toJson(msg)
        val action = (json \ "action").get.toString()
        if (msg.isEmpty) {
          println("empty message")
        } else if (msg == "opening connection") {
          println("opening message")
        } else if (action == "new"){
            board()
        } else {
          out ! (msg)
          println("Send something to Client " + msg.toString)
        }
    }

    override def update: Boolean = {
      println("update")
      out ! boardToJson(controller.getBoard()).toString()
      true
    }
  }

  def boardToJson(board: BoardInterface): JsObject = {

    val cells = ofDim[String](19, 19)
    for (i <- 0 until 19) {
      for (j <- 0 until 19) {
        cells(i)(j) = controller.getCellColor(i, j)
      }
    }

    Json.obj(
      "cells" -> Json.toJson(cells),
      "player1" -> playerToJson(board.getPlayerOne),
      "player2" -> playerToJson(board.getPlayerTwo),
      "moves" -> board.getMoves
    )
  }

  def playerToJson(player: PlayerInterface): JsObject = {
    Json.obj(
      "name" -> player.getName,
      "points" -> player.getPoints,
      "tiles" -> Json.obj(
        "red" -> player.getTiles.get("red"),
        "black" -> player.getTiles.get("black"),
        "grey" -> player.getTiles.get("grey"),
        "white" -> player.getTiles.get("white")
      )
    )
  }
}
