$(document).ready(function(){
  attachListeners()
})

$(function () {
    $(".js-next").on("click", function() {
      var nextId = parseInt($(".js-next").attr("data-id")) + 1;
      $.get("/posts/" + nextId + ".json", function(data) {
        $(".postTitle").text(data["title"]);
        $(".postContent").text(data["content"]);

        $(".js-next").attr("data-id", data["id"]);
      });
    });
  });

function nextPost(){
  var nextId = parseInt($(".js-next").attr("data-id")) + 1;
  $.ajax({
    type: "get",
    url: `/posts/${nextId}`
  }).done(function(post) {
    var newPost = new Post(post.id, post.title, post.content, post.comments)
    console.log(post)
    newPost.updateView()
  })
}

function Post(id, title, content, comments) {
  this.id = id
  this.title = title
  this.content = content
  this.comments = comments
}

Post.prototype.updateView = function(){

    var postContent = `${this.content}`
    var commentData = this.comments
    var commentList = formatCommentList(commentData)

    $("h3").text(this.title)
    $("p.content").html(postContent)

    $(".js-next").attr("data-id", this.id)
    $("#comments").html(commentList)
}

function formatCommentList(comments){
  var commentInfo = ""
  for (var i = 0; i < comments.length; i++) {
    let com = new Comment(comments[i]["id"],comments[i]["content"],comments[i]["post"]["title"])
    commentInfo += com.formatComment() + " <button class='delete-comment' data='" + com.id + "' onclick='deleteComment(this)'>Delete</button></li>"
  }
  return commentInfo
}


function attachListeners(){
  $(".js-next").click(nextPost)

      $('form').submit(function(event){
      event.preventDefault()
      createNewComment(this)

    })

    $(".delete-comment").click(function(event){
      event.preventDefault()
      deleteComment(this)
    })
}


function deleteComment(element){
  var commentId = element.attributes["data"].value
  $.ajax({
    url: '/comments/' +commentId,
    type: 'DELETE',
    success: function(result){
      $("#comment-"+result["id"]).replaceWith("")
    }
  })
}

function createNewComment(element){
  var values= $(element).serialize()
  var posting = $.post('/comments', values)

  posting.done(function(comment) {

        var newComment = new Comment(comment.id, comment.content, comment.post)

        var createdComment = newComment.formatComment() + " <button class='delete-comment' data='" + comment.id + "' onclick='deleteComment(this)'>Delete</button></li>"
        $("#comments").append(createdComment);

        $("#submit").prop( "disabled", false )
        $("#comment_text").val("")
      });

}


function Comment(id, content, post){
  this.id = id
  this.content = content
  this.post = post
}

Comment.prototype.formatComment = function(){
    return "<li id='comment-"+ this.id +"'><strong>" + this.content + "</strong>"
  }
