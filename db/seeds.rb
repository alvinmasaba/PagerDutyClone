# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Incident.destroy_all

#Create 5 team members
5.times do
  TeamMember.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    number: Faker::PhoneNumber.cell_phone_in_e164,
    oncall: Faker::Boolean.boolean
  )
end

#Create 10 incidents
10.times do
  Incident.create(
    urgency: ['HIGH', 'MEDIUM', 'LOW'].sample,
    triggered: Faker::Boolean.boolean,
    acknowledged: Faker::Boolean.boolean,
    resolved: Faker::Boolean.boolean,
    description: Faker::Lorem.sentence
  )
end

