# 🍅 Ketchup Compta

French accounting app built with 2006-era PHP patterns (intentionally legacy).

![Screenshot](docs/screenshot.jpg)

## Quick Start

```bash
docker-compose up -d
open http://localhost:8080
```

Login: `admin` / `admin123`

If port 8080 is already taken, pick another one:

```bash
APP_PORT=8099 docker-compose up -d
```

## Run Tests

Tests run inside the container, so results don't depend on what you have
installed locally. They talk to the app through the container's own port, so
the published one doesn't matter — if you only want to run tests and don't care
about browsing the app, `APP_PORT=0` lets Docker pick any free port:

```bash
APP_PORT=0 docker-compose up -d
```

Then:

```bash
docker-compose exec web bash /var/tests/run_all_tests.sh
```

Single suite:

```bash
docker-compose exec web /var/tests/vendor/bin/phpunit --configuration /var/tests/phpunit.xml --testsuite Unit
```

Dependencies install automatically on the first run, pinned by
`tests/composer.lock`.
