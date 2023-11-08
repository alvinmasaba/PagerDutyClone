class Shift < ApplicationRecord
  belongs_to :team_member
  scope :active, -> { where("shift_start <= :current_time AND shift_end >= :current_time", current_time: Time.now) }
end
