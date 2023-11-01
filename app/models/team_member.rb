class TeamMember < ApplicationRecord
  has_many :incidents, foreign_key: 'assigned_to_id'
  has_many :shifts, foreign_key: 'team_member_id'
end
