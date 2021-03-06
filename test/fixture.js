/*
 * Copyright (c) 2015, Groupon, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 *
 * Neither the name of GROUPON nor the names of its contributors may be
 * used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
 * TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
 * PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

'use strict';

const { execFile } = require('child_process');

const path = require('path');

function withFixture(name) {
  const dirname = path.join(__dirname, '..', 'tmp', name);
  const script = path.join(__dirname, 'fixtures', name);
  before('remove fixture directory', done => {
    execFile('rm', ['-rf', dirname], done);
  });
  before('create fixture directory', done => {
    execFile('mkdir', ['-p', dirname], done);
  });
  before('running fixture setup', done => {
    execFile(
      script,
      [script],
      {
        cwd: dirname,
        env: {
          HOME: '/does/not/exist',
          GIT_AUTHOR_NAME: 'Robin Developer',
          GIT_AUTHOR_EMAIL: 'rdev@example.com',
          GIT_COMMITTER_NAME: 'Robin Developer',
          GIT_COMMITTER_EMAIL: 'rdev@example.com',
        },
      },
      (error, stdout, stderr) => {
        if (error) {
          process.stdout.write(`${stdout}\n`);
          process.stderr.write(`${stderr}\n`);
        }

        done(error);
      }
    );
  });
  after('remove fixture directory', done => {
    execFile('rm', ['-rf', dirname], done);
  });
  return dirname;
}

module.exports = withFixture;
