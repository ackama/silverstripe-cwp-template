<?php

/**
* Workaround for Namespaced base classes
* Ref: https://github.com/silverstripe/silverstripe-framework/issues/5844
*/

class Page extends SilverstripeTemplateProject\Page { private static $hide_pagetype = true; }
