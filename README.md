# The widget challenge 🔥
The following is an example of a feature that's close to one of our actual features, where customers can embed widgets of different styles inside their own hotel websites. We've created a simplified version of the widget table, where you can see the different widgets and their properties on the frontend. The backend is mostly incomplete (and you'll have to add some parts ;)). For the sake of simplicity, we've mocked the database, but some of the tasks will require you act as if we have a real database in place — proper linting is not relevant for these parts.

## General
We're looking at a turborepo monorepo and you can get started with `npm i` and `npm run dev`.
The frontend is a nextjs app and the backend is a nestjs app.
Frontend will be available at `http://localhost:3000` and backend at `http://localhost:3001`

## Goal(s)
Have fun, try to write clean code and use best practices. I expect the tasks to be very much in your wheelhouse, so how you approach them, structure, simplicity of code etc. will matter. At the same time, please don't hesitate to ask if you have questions or if you need clarification (b.mann@mara.solutions).

Ideally, you can finish all tasks within the day and present a working solution. If you can't finish all tasks, please present the best possible solution you can and explain what you would do to finish the remaining tasks. Don't stress if you can't finish all tasks on time, but try your best.

## Backend tasks:
- [ ] Clean up / refactor the widgets controller as you see fit
- [ ] Add the GET (:id), PUT and POST endpoints to get a single, create and update widgets. For the POST/PUT endpoints, assume we're using Prisma as a DB ORM (broad schema below) — This can be mocked and doesn't have to be fully functional and connected to a real DB.
- [ ] Add validation for widget data with appropriate error responses
- [ ] Implement rate limiting for the widget API endpoints (choose a sane limit)
- [ ] Add / mock logging for all API endpoints using Sentry (you don't need a valid DSN)

## Frontend tasks:
- [ ] Something's not working when loading the widgets, you need to figure out what's wrong and fix it
- [ ] Implement the search functionality to filter widgets by name
- [ ] Implement the settings functionality (in a modal) to change the settings of a widget. There is a screenshot below styling should be close, but no need to be pixel perfect.
- [ ] Get creative: Add the "new widget" functionality to the site (anywhere) and make it work with the mocked POST endpoint

## Prisma schema
```
enum widgettype {
  floating
  static
}

model widgets {
  id          String      @id(map: "widgets_pkey1") @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  name        String      @default("") @db.VarChar(128)
  group_id    String      @db.Uuid
  property_id String      @db.Uuid
  type        widgettype? @default(floating)
  settings    Json        @default("{}")
  active      Boolean     @default(true)
  created     DateTime    @default(now()) @db.Timestamp(6)
  updated     DateTime    @default(now()) @updatedAt @db.Timestamp(6)
}
```

<img width="590" alt="widget-settings" src="https://github.com/user-attachments/assets/7c6e86fe-e98d-4dd5-9c74-e5f6150f1589" />
