class Incident < ApplicationRecord
  belongs_to :assigned_to, class_name: 'TeamMember'
  validates :urgency, :description, presence: true
  scope :triggered, -> { where(triggered: true) }
  scope :resolved, -> { where(resolved: true) }
  scope :acknowledged, -> { where(acknowledged: true) }
end
