class CreateLinks < ActiveRecord::Migration[5.0]
  def change
    create_table :links do |t|
      t.string :scheme
      t.string :host
      t.string :path
      t.string :params_serialized
      t.string :tags_serialized

      t.timestamps
    end
  end
end
