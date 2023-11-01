# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Shift.destroy_all
Incident.destroy_all
TeamMember.destroy_all

# Create 5 team members
20.times do
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

# Initialize a hash to track worker hours
worker_hours = Hash.new(0)

# Initialize a list of days in the week
days_of_week = (0..6).to_a

# Calculate the start and end dates for the current week
today = Date.today
start_of_week = today.beginning_of_week
end_of_week = today.end_of_week

# Create shifts for each day of the week
(0..6).each do |day_index|
  # Calculate the day's date
  day_date = start_of_week + day_index.days

  # Determine the number of active workers needed for this day
  active_workers_needed = 2

  # Shuffle the team member IDs for random assignment
  shuffled_team_member_ids = team_member_ids.shuffle

  while active_workers_needed > 0
    worker_id = shuffled_team_member_ids.pop

    # Check if the worker has not exceeded their weekly hours
    if (worker_hours[worker_id] || 0) < 40
      # Calculate a random shift start time for this worker on this day
      shift_start = Faker::Time.between_dates(from: day_date, to: day_date + 1.day, period: :all)

      # Calculate a random shift duration between 2 and 8 hours
      shift_duration = rand(2..8).hours

      # Ensure that the shift end time does not exceed the end of the day
      shift_end = [shift_start + shift_duration, day_date + 1.day].min

      # Create the shift
      Shift.create!(
        shift_start: shift_start,
        shift_end: shift_end,
        team_member_id: worker_id
      )

      # Update worker hours
      worker_hours[worker_id] += shift_duration
      active_workers_needed -= 1
    end
  end
end