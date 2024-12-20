import { faker } from "@faker-js/faker"
import { delay, http, HttpResponse } from "msw"

import type { IUserInfo } from "@/models/user"

import { withAuth } from "../middleware"

const token = "c8c59ab10e227cc56c406b4447d8"

const userInfo: IUserInfo = {
  userId: faker.string.uuid(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  avatar: faker.image.avatarGitHub(),
  password: faker.internet.password(),
  birthdate: faker.date.birthdate(),
  registeredAt: faker.date.past(),
}

const logoutResolver = () => {
  HttpResponse.json({
    handlers: {
      "Set-Cookie":
        "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=localhost",
    },
  })
}

const userResolver = () => HttpResponse.json(userInfo)

async function userLoginResolver() {
  await delay(1000 * 3)
  return HttpResponse.json(userInfo, {
    status: 200,
    headers: {
      "set-cookie": `token=${token};`,
    },
  })
}
export const userHandlers = [
  http.get("/api/user", withAuth(userResolver)),
  http.post("/api/logout", withAuth(logoutResolver)),
  http.post("/api/login", userLoginResolver),
]
