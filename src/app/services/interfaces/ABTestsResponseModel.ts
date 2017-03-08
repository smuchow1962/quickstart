/**
 * Created by 104653 on 3/6/17.
 */



import {Type } from "class-transformer";

export class EventCampaignData {
  background: string;
  getCoinsButton: string;
  splashSaleButton: string;
}

export class EventCampaignTheme {
  @Type(() => EventCampaignData)
  android: EventCampaignData;
  @Type(() => EventCampaignData)
  iOS: EventCampaignData;
}

export class EventCampaignThemeDefaultMobile {
  background: string;
  getCoinsButton: string;
  splashSaleButton: string;
}

export class EventCampaignThemeDefaultCanvas {
  bundleName: string;
}

/**
 * The all-important theme object for campaign themes.
 */
export class ABTestEventInfo {
  enabled: boolean;
  name: string;
  @Type(() => EventCampaignTheme)
  theme: EventCampaignTheme;
  @Type(() => EventCampaignThemeDefaultMobile)
  themeDefaultMobile: EventCampaignThemeDefaultMobile;
  @Type(() => EventCampaignThemeDefaultCanvas)
  themeDefaultCanvas: EventCampaignThemeDefaultCanvas;
}

/**
 * this is the ACTUAL content found in a given v2_ab_test_group_{docId}.
 */
export class ABTestGroupContents {
  variant: number;
  id: number;
  testName: string;
  controlFlagId: number;

  enabled?: boolean;
  description?: string;
  playerId?: string;
  startDate?: string;
  endDate?: string;
  @Type(() => ABTestEventInfo)
  eventInfo?: ABTestEventInfo;
  priority?: number;
  track?: number;
}

/**
 * An encapsulation of the v2_ab_test_group_{docId} document. Priority Info, (docId), test configDocumentName, etc.
 * This document helps to alphabetize the v2_ab_test_group_{docId} items and modify the tree labelling if needed.
 */
export class ABTestConfigInfo {
  @Type(() => ABTestGroupContents)
  contents: ABTestGroupContents;
  priority: number;
  docId: number;
  testName: string;
  docName: string;
}

/**
 * all the v2_ab_test_group_{docId} documents that map to the 'test' string are grouped together
 */
export class ABTestCollectionObject {
  test: string; // bet_calculator, early_access, etc. - the test configDocumentName
  @Type(() => ABTestConfigInfo)
  items: ABTestConfigInfo[]; // unique config_document items associated with the test
}

/**
 * an array of the individual test classes. Each element contains the v2_ab_test_group_{docId} that match the
 * test type (so all v2_test_group_{number} that point to early_access are found in 'tests'
 */
export class ABTestsResponses {
  $type: string;  // always "$type" : "models.EmptyModel"
  @Type(() => ABTestCollectionObject)
  tests: ABTestCollectionObject[]; // an array of all the ab test classifications found
}

/**
 * The TOP-LEVEL response Object
 */
export class ABTestsResponseModel {
  status: string;         // standard psl return info => 'ok'
  serverTimeUTC: number;  // standard psl return info
  psl: string;            // standard psl return info => 1.1

  @Type(() => ABTestsResponses)
  responses: ABTestsResponses[]; // responses[0] contains the relevant data
}


