export interface IGoldTeamMember {
  id?: string
  doj?: string
  dateOfJoining?: string
  userId?: string
  name?: string
  sponsorId?: string
  placementId?: string
  placement?: string
  business?: string
  rankClub?: string
  status?: string
  package?: string
  mobile?: string
  emailId?: string
  directs?: string
}

export interface IGoldTeam {
  id?: string
  userId?: string
  name?: string
  designation?: string
  dateOfJoining?: string
  introducerUserId?: string
  introducerName?: string
  members?: IGoldTeamMember[]
}
