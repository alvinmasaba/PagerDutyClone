class TeamMember < ApplicationRecord
  has_many :incidents, foreign_key: 'assigned_to_id'
end
