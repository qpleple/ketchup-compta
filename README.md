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

Tests run inside the container, so results don't depend on what you have
installed locally. Start the app first (`docker-compose up -d`), then:

```bash
docker-compose exec web bash /var/tests/run_all_tests.sh
```

Single suite:

```bash
docker-compose exec web /var/tests/vendor/bin/phpunit --configuration /var/tests/phpunit.xml --testsuite Unit
```

Dependencies install automatically on the first run, pinned by
`tests/composer.lock`.
