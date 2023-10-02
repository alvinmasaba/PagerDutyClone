class Incident < ApplicationRecord
  belongs_to :assigned_to, class_name: 'TeamMember'
  validates :urgency, :description, presence: true
end
