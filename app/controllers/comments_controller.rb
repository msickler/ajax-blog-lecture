class CommentsController < ApplicationController
  def create
  @comment = Comment.create(comments_params)
  render json: @comment, status: 201
end

def destroy
  @comment = Comment.find(params[:id])
  @comment.destroy
  render json: @comment
end

def index
  @comments = Comment.all
  render json: @comments
end

private
def comments_params
  params.require(:comment).permit(:content, :post_id)
end
end
