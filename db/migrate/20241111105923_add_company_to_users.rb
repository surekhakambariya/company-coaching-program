class AddCompanyToUsers < ActiveRecord::Migration[7.2]
  def change
    add_reference :users, :company, null: true, foreign_key: true
  end
end
