FactoryBot.define do
  factory :shift do
    shift_start { "2023-11-01 01:39:39" }
    shift_end { "2023-11-01 01:39:39" }
    team_member { nil }
  end
end
