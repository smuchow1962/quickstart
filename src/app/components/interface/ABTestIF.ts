export interface abControlFlagIF {
  variant: number;
  enabled: boolean;
  testName: string;
}

export interface abContentsIF {
  variant: number|string;
  enabled: boolean;
  description: string;
  id: number|string;
  testName: string;
  controlFlagId: number;
  playerId: string;
  controlFlag: abControlFlagIF[];
  priority?: number;
  track?: number;

  getPriority(): number;
  getConfigDocName(prefix:string): string;
  getDocId(): string;
  getVariant(): string;
}

export interface abItemIF {
  contents: abContentsIF;
  priority: number;
  docId: number|string;
  testName: string;
  docName: string;

  getDocId(): string;
}

export interface abTestIF {
  test: string;
  items: abItemIF[];
}

export interface abResponsIF {
  $type: string;
  tests: abTestIF[];
}

export interface abTestResponseIF {
  status: string;
  serverTimeUTC: number;
  psl: string;
  responses: abResponsIF[];
}

export class ABTestGroupContents implements abContentsIF {
  getConfigDocName(prefix: string): string {
    return prefix + '_ab_config_' + this.testName + '_' + this.variant;
  }

  getPriority(): number {
    return null;
  }

  getDocId(): string {
    return this.id.toString();
  }

  getVariant(): string {
    return this.variant.toString();
  }

  constructor(
    public variant: number|string,
    public enabled: boolean,
    public description: string,
    public id: number,
    public testName: string,
    public controlFlagId: number,
    public playerId: string,
    public controlFlag: abControlFlagIF[],
    public priority?: number,
    public track?: number) {
  }

}

export class ABTestObject implements abTestIF {
  constructor (public test:string,
               public items:abItemIF[]) {
  }
}

export class ABTestItemObject implements abItemIF {

  getDocId(): string {
    return this.docId.toString();
  }

  constructor(public testName:string,
              public docName:string,
              public docId:number|string,
              public priority:number,
              public contents:abContentsIF) {
  }
}

export class ABTestResponse implements abTestResponseIF {
  constructor ( public status: string,
                public serverTimeUTC: number,
                public psl: string,
                public responses: abResponsIF[]) { }
}

