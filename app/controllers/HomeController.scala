package controllers

import com.google.inject.Inject
import caro.Caro
import caro.controller.controllerComponent.ControllerInterface
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
    Ok(controller.boardToString)
  }

  /**
   * Puts tile of given color in specified slot
   * @param color color as String
   * @param row row index as Int
   * @param col col index as Int
   * @return
   */
  def put(color: String, row: Int, col: Int): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.putCell(row, col, color)
    Ok(controller.boardToString)
  }

  /**
   * Undo last move
   * @return
   */
  def undo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.undo()
    Ok(controller.boardToString)
  }

  /**
   * Redo last undone move
   * @return
   */
  def redo(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.redo()
    Ok(controller.boardToString)
  }

  /**
   * Save board
   * @return
   */
  def save(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.save()
    Ok("board was saved")
  }

  /**
   * Load saved board
   * @return
   */
  def load(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.load()
    Ok(controller.boardToString)
  }

  /**
   * Change player1 name
   * @param name Player name as String
   * @return
   */
  def player1(name: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.newBoard(name, controller.getPlayerTwoName)
    Ok(controller.boardToString)
  }

  /**
   * Change player2 name
   * @param name Player name as String
   * @return
   */
  def player2(name: String): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    controller.newBoard(controller.getPlayerOneName, name)
    Ok(controller.boardToString)
  }

  def rules(): Action[AnyContent] = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.caro.rules())
  }
}
