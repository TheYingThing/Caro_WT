package controllers

import caro.Caro
import caro.controller.controllerComponent.ControllerInterface
import com.google.inject.Inject
import play.api.mvc._

import javax.inject._
/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

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
   * @param color color as String
   * @param row row index as Int
   * @param col col index as Int
   * @return
   */
  def put( row: Int, col: Int, color: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.putCell(row + 2 , col + 2, color)
    Ok(views.html.caro.board(this))
  }

  /**
   * Undo last move
   * @return
   */
  def undo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.undo()
    Ok(views.html.caro.board(this))
  }

  /**
   * Redo last undone move
   * @return
   */
  def redo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.redo()
    Ok(views.html.caro.board(this))
  }

  /**
   * Save board
   * @return
   */
  def save(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.save()
    Ok(views.html.caro.board(this))
  }

  /**
   * Load saved board
   * @return
   */
  def load(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.load()
    Ok(views.html.caro.board(this))
  }

  /**
   * Change player1 name
   * @param name Player name as String
   * @return
   */
  def player1(name: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.newBoard(name, controller.getPlayerTwoName)
    Ok(views.html.caro.board(this))
  }

  /**
   * Change player2 name
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

  def score(): Action[AnyContent] = Action {
    Ok(views.html.caro.score(this))
  }

  def newGame(): Action[AnyContent] = Action {
    controller.newBoard(controller.getPlayerOneName, controller.getPlayerTwoName)
    Ok(views.html.caro.newgame())
  }

  def startGame(player1: String, player2: String): Action[AnyContent] = Action {
    controller.newBoard(player1, player2)
    Ok(views.html.caro.board(this))
  }
}
