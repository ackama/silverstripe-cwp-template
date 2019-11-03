# Silverstripe CWP Template Project

## Meta Section

_Erase this section after going through it_

Defaults for namespaces and prefixes have been chosen so they are easily replaceable after copying this project. Please do the following replacements:

* Replace `silverstripe-template-project` in all files with the name of your project.
* Replace `SilverstripeTemplateProject` in all files with the namespace of your project.
* Rename `themes/silverstripe-template-project` to the name of the template of your project.

In the case that the project uses a Heroku Test instance, please configure according to this section [Heroku Config]

Current maintainers: matias.halles@ackama.com

## Purpose

_Fill in purpose of this project_

## Operations

_Edit as necessary_

Bitbucket pipelines need to be active and configured  

This project follows the following branch convention:
**master** Main development branch
**deployment** Deployment branch that gets tagged and tagged releases are deployed

| **Environment**  | **URL**                                | **Hosting Platform** | **Git Branch**      | 
|------------------|----------------------------------------|----------------------|---------------------|
| Test             | _TODO_                                 | Heroku               | deployment (tagged) |
| Staging / UAT    | _TODO_                                 | CWP                  | deployment (tagged) |
| Production       | _TODO_                                 | CWP                  | deployment (tagged) |

### SSH access

CWP does not provide SSH access.
Heroku provides access but it's discouraged. Heroku allows command to be ran remotely.
There will be no SSH access to the servers.

### Secrets

The keys are stored encrypted in BitBucket pipelines.

## Project Resources:

| **Resource**    | **URL**                                                                       |
|-----------------|-------------------------------------------------------------------------------|
| Repository      | https://bitbucket.org/rabidtech/silverstripe-cwp-template |
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
* docker-sync [Optional]

### Running the app

Clone the project: `git clone git@bitbucket.org:rabidtech/rabidtech/silverstripe-cwp-template.git`

Once the project is cloned, execute this command:

* `docker-compose up` will setup your runtime environment.
  
Optionally you can use `docker-sync` to synchronise files between your host
and the container. There's a significant runtime speed advantage when using
docker-sync. 

#### Using `docker-sync`

##### Install

For macOS:
`gem install docker-sync` 
If the `docker-sync` command fails with 'Fatal error: No file monitoring helper program found' then execute the following command:
`brew unlink unox && brew link unox`
https://github.com/hnsl/unox/issues/24

For Windows: follow the instructions here - 
https://docker-sync.readthedocs.io/en/latest/getting-started/installation.html#windows

##### Running Docker-sync

In order to run the project on docker-sync, run these command on separate shells. Both
are services that must keep on running:

* `docker-sync start -f` which will setup your local files shares
  and screen the output log. Wait for this to finish creating the volumes
  before fireing up docker-compose. Also, the first sync may take a while.
  
* `docker-compose -f docker-compose.yml -f docker-compose-sync.yml up` will setup your
runtime environment with the shared volume created by docker-sync.

### Using your development environment

* The website will be available at `https://localhost:9443`
* Use `./shell` to log in into your local dev environment
* You will need to run `composer install --no-scripts`, `composer vendor-expose`
  (Read note below) and `npm install --dev` to make your dependencies available
  and build your project. It is recommended to do so inside you dev environment
  as it is speedier.
* Run `npm run watch` in a separate view to build your assets in realtime. 
* Whenever you make changes in your silverstripe app or theme, run `sake dev/build flush=1`
* MailDev is available at http://localhost:1080

#### Runtime in your environment

To kickstart your development, dependencies and building processes need to be
run, ideally from inside your docker machine (`./shell`). Running these
commands will be ready to build:

```
composer install --no-scripts
composer vendor-expose
npm ci
sake dev/build flush=1
npm run watch
```

#### Build your project

Your project's build process is configured to run automatically in a two-step process.

* First the project gets tested and its assets get built and bundled in a bitbucket pipeline.
* Secondly, CWP deploys the silverstripe project.

Although running the realtime packager or the bundler should render the same results, if you
find yourself needing to build your project as it would be built by CI/CD for debugging purposes, run these:

```
composer install --no-scripts
npm ci
npm run package
```

#### Dependencies cache

Currently `npm` and `composer` caches are held per project. It's possible to use a shared
cache across all docker requests. In order to do so, you will need to create both
volume shares (only once across your system) and always execute `docker-compose` with
one more config file:

```bash
docker volume create npm-cache
docker volume create composer-cache
docker-compose -f docker-compose.yml -f docker-compose-sync.yml -f docker-compose-extcache.yml up
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
the usage of Solr will fail. You do this by accessing your shell and executing:

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
In `./shell` run `vendor/bin/phpunit`

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
