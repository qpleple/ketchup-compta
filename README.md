# 🍅 Ketchup Compta

French accounting app built with 2006-era PHP patterns (intentionally legacy).

![Screenshot](docs/screenshot.jpg)

## Quick Start

```bash
docker-compose up -d
open http://localhost:8080
```

Login: `admin` / `admin123`

## Run Tests

Tests run **inside the container** — that pins PHP to the version the app ships
with, so results don't depend on what you have installed locally. Start the app
first (`docker-compose up -d`), then:

```bash
docker-compose exec web bash /var/tests/run_all_tests.sh
```

Single suite:

```bash
docker-compose exec web /var/tests/vendor/bin/phpunit --configuration /var/tests/phpunit.xml --testsuite Unit
```

Dependencies are installed automatically on the first run, and pinned by
`tests/composer.lock`. If you ever install them from the host instead, Composer
still resolves for PHP 8.1 (`config.platform` in `tests/composer.json`) so the
container keeps working.

<details>
<summary>Running on the host instead (not the supported path)</summary>

Needs PHP >= 7.3 locally. Unit tests work as-is; functional tests need the app
running and the port the app is published on:

```bash
cd tests && composer install
./vendor/bin/phpunit --configuration phpunit.xml --testsuite Unit
APP_URL=http://localhost:8080 ./vendor/bin/phpunit --configuration phpunit.xml --testsuite Functional
```

</details>
