# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Incident.destroy_all
TeamMember.destroy_all

# Create 5 team members
10.times do
  TeamMember.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    number: Faker::PhoneNumber.cell_phone_in_e164,
  )
end

# Fetch all team member IDs
team_member_ids = TeamMember.pluck(:id)

# Create 10 incidents
10.times do
  Incident.create!(
    urgency: ['HIGH', 'MEDIUM', 'LOW'].sample,
    triggered: Faker::Boolean.boolean,
    acknowledged: Faker::Boolean.boolean,
    resolved: Faker::Boolean.boolean,
    description: Faker::Lorem.sentence,
    assigned_to_id: team_member_ids.sample
  )
end

# Calculate the start and end dates for the current week
today = Date.today
start_of_week = today.beginning_of_week
end_of_week = today.end_of_week

# Create random shifts for the current week
(10..15).to_a.sample.times do
  shift_start = Faker::Time.between_dates(from: start_of_week, to: end_of_week, period: :day)
  shift_end = shift_start + rand(2..8).hours  # Random shift duration between 2 and 8 hours

  Shift.create!(
    shift_start: shift_start,
    shift_end: shift_end,
    team_member_id: team_member_ids.sample
  )
end