# Changelog

## [2.8.0] -- 2019-05-21
### Added
- ENV `ALWAYS_INCLUDE_ERROR_STACKS` to include full error stack, including any causal errors.
  * Use with caution in production, because the full stack could leak sensitive information.
- Optional email verification for users
  * When `AUTH_SERVICE_REQUIRE_ACCOUNT_VERIFICATION=true`, a user cannot sign-in without email verification
  * When `AUTH_SERVICE_REQUIRE_SECURE_ACCOUNT_VERIFICATION=true`, a user password is required for email verification
- `logLevelGte()` utility function.

### Fixed
- `auth.controller.js:login()` no longer throws duplicate errors for incorrect username or password
- Use error handling middlware `winstonInstance.info(err)`
  * Previously, `winstonInstance.errorLogger()` always threw a `TypeError`, meaning the underlying error didn't actually show in the logs
- `class:APIError` supports full stack traces, including causal errors.
- Update `npm:winston` to `^3.2.1` and `npm:winston-json-formatter` to `^0.10.0` for logging bug fixes and formatting features (see https://github.com/amida-tech/winston-json-formatter/pull/5).
  * Logs "operational errors" at the `warn` level and "programmer errors" at the `error` level.
- PG connection will now fail (and this service will abort) if `AUTH_SERVICE_PG_SSL_ENABLED=true` but `AUTH_SERVICE_PG_CA_CERT` is not set to a valid value.

### Changed
- `AUTH_SERVICE_SEED_ADMIN_USERNAME` now supports alphanum and email addresses 


## [2.7.2] -- 2019-05-14
### Fixed
- Patch for CVE-2019-5021 in `Dockerfile`. `node:8.16.0-alpine` uses a patched version of `alpine`.


## [2.7.1] -- 2019-05-01
### Fixed
- `docker run amidatech/auth-service` threw `Error: Cannot find module 'source-map-support/register'`


## [2.7.0] -- 2019-02-04
### Added
- Prepush githook for `yarn lint` and `yarn test` with `npm:husky`

### Changed
- `yarn test` command changed to _only_ run tests
  * `yarn jenkins` includes DB creation, migrations, etc.
- ENV `AUTH_SERVICE_SEED_ADMIN_PASSWORD`, max char 30 --> 512 (DB constraint from `src/db/migrations/20180904132710-create-user.js`)
- Refactor sequelize in `./src/db/`
- Babel6 --> 7
- Update `package.json:engines`
- Update `docker-compose.yml` including postgres 9.4.11 --> 9.6

### Removed
- gulp3
  * ~5x faster `yarn build` 
  * Identical functionality (`yarn start` for `nodemon`, `yarn clean`, sourcemaps)
- ENV vars
  * `AUTH_MICROSERVICE_URL`
  * `AUTH_SERVICE_PASSWORD_RESET_PAGE_URL`
  * `AUTH_SERVICE_ONLY_ADMIN_CAN_CREATE_USERS`


## [2.6.0] -- 2018-12-12
### Added
- Consolidated logging with `npm:winston-json-formatter`.

### Changed
- Seed admin user will get password `AUTH_SERVICE_SEED_ADMIN_PASSWORD` if specified; otherwise it will be auto-generated and logged to stdout when that user is created.
- Password reset URL in reset password request, rather than as an env var.
- DEVOPS-365 related Dockerfile improvements.
- Jenkins tests now use `.env.test`.

### Fixed
- Seed scripts on Windows.
- Broken tests.

### Removed
- Config ENV VAR
  * `AUTH_MICROSERVICE_URL`.
  * `AUTH_SERVICE_ONLY_ADMIN_CAN_CREATE_USERS`.
  * `PASSWORD_RESET_PAGE_URL`. (Password reset URL in reset password request, rather than as an env var.)

### Security
- Fixed some dependency vulnerabilities.
