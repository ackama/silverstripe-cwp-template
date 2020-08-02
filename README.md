# Silverstripe CWP Template Project

## Meta README

_You can erase this section after completing it_

### Pre-project

CWP accounts/environments take up a long time to get setup. Make sure this has
been requested before removing comment.

CWP will need a personal account for each of your developers. It will also require
a Release Manager role. Make a list of people with e-mail, name and role. Attach the list with
your request to your client. With this information they will be able to create the request and
immediately provide Ackama with the required permission to start using the account

Please read our [SilverStripe CWP Project Management](https://github.com/ackama/wiki/wiki/SilverStripe-CWP-Project-Management) wiki page  for more thorough information regarding managing a CWP project.

Also refer to our [Ackama README Template](https://github.com/ackama/wiki/wiki/Ackama-README-Template) wiki page to better customise this README

### Project Setup

#### Clone and Clean

Clone this repository, remove its `.git` directory and initialise it as a new repository:

```
$ git clone git@github.com:ackama/silverstripe-cwp-template.git your-project
$ cd your-project
$ rm -rf .git
$ git init 
```

#### Rename Resources

Defaults for namespaces and prefixes have been chosen so they are easily replaceable after
copying this project. Please do the following replacements:

* Replace `silverstripe-template-project` in all files with the name of your project.
* Replace `SilverstripeTemplateProject` in all files with the namespace of your project.
* Replace `silverstripe-template-theme` in all files with the name of your theme.
* Rename `themes/silverstripe-template-theme` to the name of the theme of your project.

#### Basic Configuration

* Remove the `.gitignore` lines for `package-lock.json` and `composer.lock`
* Replace your Sentry DSN, or remove file otherwise: `./app/_config/sentry.yml`
* Configure `app/_config/email.yml` according to your project.

## Purpose

_Fill in purpose of this project_

## Operations

_Edit as necessary_

CI pipelines need to be active and configured

This project follows the following branch convention:
**master** Main development branch
**deployment** Deployment branch that gets tagged and tagged releases are deployed

| **Environment** | **URL**                                | **Hosting Platform** | **Git Branch**      | 
|-----------------|----------------------------------------|----------------------|---------------------|
| Test            | _TODO_                                 | Heroku               | deployment (tagged) |
| UAT             | _TODO_                                 | CWP                  | deployment (tagged) |
| Production      | _TODO_                                 | CWP                  | deployment (tagged) |

### SSH access

CWP does not provide SSH access.
There will be no SSH access to the servers.

### Secrets

Secrets are stored encrypted in the CI's config

## Project Resources:

| **Resource**    | **URL**                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| Repository      | https://github.com/ackama/silverstripe-cwp-template |
| Backlog URL     | [ Placeholder ] |
| Invision        | [ Placeholder ] |

## People Involved

| **Role(s)**     | **Name(s)**             |
|-----------------|-------------------------|
| Developers      | - |
| Designer        | - |
| Project Manager | - |
| Product Owner   | - |

### Dependencies

* docker
* docker-compose

### Running the app

Clone the project: `git clone git@github.com:ackama/silverstripe-cwp-template.git`

Once the project is cloned, execute this command:

* `docker-compose up` will setup your runtime environment.

### Using your development environment

* The website will be available at `https://localhost`. You might need to override how your browser treats
  *localhost* Insecure Certificates, as the docker machine uses a self-signed certificate:
   * Chrome & Opera: Browse to chrome://flags/#allow-insecure-localhost and Enable the highlighted option.
   * Firefox: you will be given the option to accept the risk of opening your localhost URL
* Use `bin/console` to log in into your local dev environment
* If you want to have access to your dependencies in the host, run `composer install --no-scripts`,
  `composer vendor-expose` and `npm install --dev`. These directories are not shared to avoid lowering
  performance.
* Run `npm run watch` in a separate view to build your assets in realtime. 
* Whenever you make changes in your silverstripe app or theme, run `sake dev/build flush=1`
* MailDev is available at http://localhost:1080

#### Runtime in your environment

To kickstart your development, dependencies and building processes need to be
run, ideally from inside your docker machine (`bin/console`). Running these
commands will be ready to build:

```
composer install --no-scripts
composer vendor-expose
npm install --dev
sake dev/build flush=1
npm run watch
```

#### Build your project

Your project's build process is configured to run automatically in a two-step process.

* First the project gets tested and its assets get built and bundled in a CI pipeline.
* Secondly, CWP deploys the silverstripe project.

Although running the realtime packager or the bundler should render the same results, if you
find yourself needing to build your project as it would be built by CI/CD for debugging purposes, run these:

```
composer install --no-scripts
npm ci
npm run package
```

#### Dependencies cache [Optional]

Currently `npm` and `composer` caches are held per project. It's possible to use a shared
cache across all docker requests. In order to do so, you will need to create both
volume shares (only once across your system) and always execute `docker-compose` with
one more config file:

```bash
docker volume create npm-cache
docker volume create composer-cache
docker-compose -f docker-compose.yml -f docker-compose-extcache.yml up
```

This will ensure that even if you reset your environment, the dependencies cache
are kept and rebuilds are sped up. 

#### Testing in your environment

Because of the nature of CWP, local usage of composer should be done in
a slightly different way. Ideally you would use composer this way in order
to get a working copy of your project as this is the way CWP deploys,
potentially skipping steps in your project or dependencies.

* `composer install --no-scripts`
* `composer vendor-expose`
* `sake dev/build`

Using `composer install`  _might_ lead to differences when testing. Your builds,
however, will get tested and build in the CI pipeline using the method described
above, both before merging and after.

#### Solr Search

Solr Search capabilities are available for your local environment. You can
access the Solr console on http://localhost:8983/solr

Your development environment enabled Solr Search **only when in `dev` mode and
the environment value `SS_SOLR_ENABLED` has been set**, otherwise it assumes no
configurations. Your docker-compose file already contains this deafult
configurations. If you wish to configure Solr check the
[required ENV values](https://docs.silverstripe.org/en/4/getting_started/environment_management/)
and the `app/_config.php` file. 

By default the engine is activated and running. You will need to manually
execute the Configuration task and the Indexing tasks when you want. Otherwise
the usage of Solr will fail. You do this by accessing your console and executing:

```
sake dev/tasks/Solr_Configure
sake dev/tasks/Solr_Reindex
```

### Load a working copy from other environments

* Obtain a silverstripe packed version of the site. you can do so by
  downloading a snapshot from CWP's dashboard. Navigate into
  `Project > Snapshot > Create Snapshot`, create a snapshot or choose one
  that's available and download it into the root of your project
* Run `sspak load [snapshot-filename]` will load the database and uploaded
  assets into your install
* Subsequently run `sake dev/build "flush=1"`

### Running tests
In `bin/console` run `vendor/bin/phpunit`

### Deploying outside of CWP

If you are deploying to environments other than CWP (like Heroku), configure
your environment accordingly:

* If your application workers are behind a proxy in `test` mode, you need
  to make SilverStripe aware of the proxy's IP. in order for it to behave
  as expected. In your environment, set teh `SS_TRUSTED_PROXY_IPS` value to
  either `*` or a comma-separated list of known IPs.
* Remember that `dev` mode will by default not enforce SSL protection.

Find more information about environment management at:

* [CWP environment variables](https://www.cwp.govt.nz/developer-docs/en/2/working_with_projects/cwp_environment_variables)
* [Silverstripe Environment Management](https://docs.silverstripe.org/en/4/getting_started/environment_management/)
