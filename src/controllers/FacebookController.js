export default class FacebookController {
  constructor() {
    this.getFeed = this.getFeed.bind(this);
  }

  static get received_feed() {
    return this._recieved_feed || [];
  }

  static set received_feed(v) {
    this._recieved_feed = v;
  }

  static getSubscribe(req, res) {
    if (
      req.query["hub.mode"] === "subscribe" &&
      req.query["hub.verify_token"] ===
        process.env.FACEBOOK_WEBHOOK_VERIFY_TOKEN
    ) {
      res.send(req.query["hub.challenge"]);
    } else {
      res.sendStatus(400);
    }
  }

  static callbackWebhook(req, res) {
    let temp = FacebookController.received_feed;
    temp.unshift(req.body);
    FacebookController.received_feed = temp;
    res.sendStatus(200);
  }

  static getFeed(req, res) {
    res.send(
      "<pre>" +
        JSON.stringify(FacebookController.received_feed, null, 2) +
        "</pre>"
    );
  }
}
