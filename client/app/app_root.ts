//
// Copyright 2019 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
//
import {Component, Inject, OnDestroy} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {parseHashFragment} from './util';
import {COLLECTION_NAME_KEY} from './util/hash_keys';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

/**
 * The SchedViz app point of entry.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.ng.html',
  styleUrls: ['./app.css'],
})
export class AppRoot implements OnDestroy {
  private readonly unsub$ = new Subject<void>();

  constructor(
      private readonly router: Router,
  ) {

    let {hash} = window.location;
    const hashMap = parseHashFragment(hash);
    if (hashMap[COLLECTION_NAME_KEY]) {
      // Strip off leading #.
      // This is safe because we previously checked that the hash was valid.
      hash = hash.substring(1);
      this.router.navigate(['/dashboard'], {fragment: hash});
    }
  }


  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
