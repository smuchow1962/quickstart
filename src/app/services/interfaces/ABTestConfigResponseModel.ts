/**
 * Created by 104653 on 3/7/17.
 */

import { Type } from "class-transformer";

/**
 * an array of the individual test classes. Each element contains the v2_ab_test_group_{docId} that match the
 * test type (so all v2_test_group_{number} that point to early_access are found in 'tests'
 */
export class ABTestConfigDocument {
  $type: string;    // always "$type" : "models.EmptyModel"
  docName: string;  // the couchbase document configDocumentName
  data: any;        // the data contents
}

/**
 * The TOP-LEVEL response Object
 */
export class ABTestConfigResponseModel {
  status: string;         // standard psl return info => 'ok'
  serverTimeUTC: number;  // standard psl return info
  psl: string;            // standard psl return info => 1.1

  @Type(() => ABTestConfigDocument)
  responses: ABTestConfigDocument[]; // responses[0] contains the relevant data
}

