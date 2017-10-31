class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :comments
  has_many :comments
end
