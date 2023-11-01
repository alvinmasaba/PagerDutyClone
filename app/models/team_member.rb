class TeamMember < ApplicationRecord
  has_many :incidents, foreign_key: 'assigned_to_id'
  has_many :shifts, foreign_key: 'team_member_id'
  scope :on_call, lambda {
    joins(:shifts).where("shifts.shift_start <= ? AND shifts.shift_end >= ?", Time.now, Time.now)
  }

  def on_call
    return false if shifts.active.empty?

    true
  end
end
