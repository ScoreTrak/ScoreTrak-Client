
export type Property = {
    Value: string,
    Status: string
}

export type Check = {
    Passed:             boolean
    Log:                string
    Err:                string
}

export type Service = {
    Check:              Check | undefined
    Pause:              boolean
    Hide:               boolean,
    Name:               string,
    DisplayName:        string,
    Weight:             number,
    Points:             number,
    PointsBoost:        number,
    Properties:         Record<string, Property>,
    ServiceGroup: ServiceGroup
}

export type ServiceGroup = {
    ID:      string,
    Name:    string,
    Enabled: boolean
}

export type Host = {
    HostGroup: HostGroup | undefined,
    Address:   string,
    Services:  Record<string, Service>,
    Pause:     boolean,
    Hide:      boolean,
}

export type Team = {
    Hosts:   Record<string, Host>,
    Name:    string,
    Pause:   boolean,
    Hide:    boolean,
    TotalPoints: number
}

export type HostGroup = {
    ID:      string,
    Name:    string,
    Pause:   boolean,
    Hide:    boolean,
}

export type Report = {
    Round: number,
    Teams: Record<string, Team>,
}