# Create roles
Role.create(name: 'admin')
Role.create(name: 'coach')
Role.create(name: 'employee')

# Create an admin user for testing
admin_user = User.create!(
  email: 'admin@example.com',
  password: 'password',
  password_confirmation: 'password'
)
admin_user.assign_default_role(:admin)

# Create default users
5.times do |i|
  user = User.create!(
    email: "employee#{i}@example.com",
    password: 'password',
    password_confirmation: 'password'
  )
  user.assign_default_role(:employee)
end
2.times do |i|
  user = User.create!(
    email: "coach#{i}@example.com",
    password: 'password',
    password_confirmation: 'password'
  )
  user.assign_default_role(:coach)
end

# Create default companies
10.times do |i|
  company = Company.create!(
    name: "Company #{i + 1}",
    user: admin_user # Assigning the admin user as the owner
  )

  # Create coaching programs for each company
  5.times do |j|
    coaching_program = CoachingProgram.create!(
      name: "Coaching Program #{j + 1} for #{company.name}",
      description: "Description for Coaching Program #{j + 1}",
      user: admin_user, # Assigning the admin user as the creator
      coach: User.with_role(:coach).sample, # Randomly assign a coach
    )

    # Create company programs for each coaching program
    CompanyProgram.create!(
      company: company,
      coaching_program: coaching_program,
      coach: User.with_role(:coach).sample # Randomly assign a coach
    )
  end
end

# Create coaching program enrollments
User.with_role(:employee).find_each do |employee|
  CompanyProgram.all.sample(3).each do |company_program|
    CoachingProgramEnrollment.create!(
      user: employee,
      company_program: company_program,
      status: :joined
    )
  end
end
