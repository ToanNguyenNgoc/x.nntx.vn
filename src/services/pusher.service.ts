/* eslint-disable @typescript-eslint/ban-ts-comment */
import { API_URL } from "@/configs";
import { CONST } from "@/utils";
import Pusher from "pusher-js";

//@ts-ignore
window.Pusher = Pusher;

export class PusherService {
  private static instance: PusherService;
  private pusher: Pusher;

  private constructor() {
    if (CONST.isDev) {
      Pusher.logToConsole = true;
    }

    this.pusher = new Pusher(CONST.key.pusherKey, {
      cluster: "ap1",
      authEndpoint: `${API_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("api_token")}`,
          Accept: "application/json",
        },
      },
    });
  }

  public static getInstance(): PusherService {
    if (!PusherService.instance) {
      PusherService.instance = new PusherService();
    }
    return PusherService.instance;
  }

  public getPusher(): Pusher {
    return this.pusher;
  }
}