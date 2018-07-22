#!/usr/bin/env bash

set -ex

npm version ${1} -m "[release] %s"
