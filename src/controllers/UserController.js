import UserService from "../services/UserService";

export default class UserController {
  constructor() {
    this.postLogin = this.postLogin.bind(this);
  }

  static postLogin(req, res, next) {
    const { UserName, PassWord } = req.body;
    return UserService.postLogin(UserName, PassWord)
      .then(_res => res.status(200).json(_res.data))
      .catch(err => next(err));
  }

  static getFaculty(req, res, next) {
    return UserService.getFaculty()
      .then(_res => res.status(200).json(_res.data))
      .catch(err => next(err));
  }

  static getDepartment(req, res, next) {
    return UserService.getDepartment()
      .then(_res => res.status(200).json(_res.data))
      .catch(err => next(err));
  }
}
