terraform {
  required_providers {
    heroku = {
      source = "heroku/heroku"
      version = "4.2.0"
    }
  }
}

provider "heroku" {
  email = var.email_adress
  api_key = var.heroku_api_key
}

resource "heroku_app" "app_staging" {
  name = "CanITakeIt-staging"
  region = "eu"
}

resource "heroku_addon" "postgres_stagging" {
  app = heroku_app.app_staging.name
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_app" "app_prod" {
  name = "CanITakeIt-prod"
  region = "eu"
}

resource "heroku_addon" "postgres_prod" {
  app = heroku_app.app_prod.name
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_pipeline" "pipeline" {
  name = "CanITakeIt"
}

resource "heroku_pipeline_coupling" "stage_stagging" {
  app = heroku_app.app_staging.name
  pipeline = heroku_pipeline.pipeline.id
  stage = "staging"
}

resource "heroku_pipeline_coupling" "stage_prod" {
  app = heroku_app.app_prod.name
  pipeline = heroku_pipeline.pipeline.id
  stage = "production"
}