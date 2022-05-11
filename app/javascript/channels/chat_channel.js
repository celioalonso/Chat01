import consumer from "./consumer"

const chatChannel = consumer.subscriptions.create("ChatChannel", {
  connected() {
    console.log("Connected to the chat room!");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    $('#messages').append(`<p>${data.message}</p>`);
    $('html, body').animate({scrollTop:$(document).height()}, 0);
  },

  speak: function(message) {
    return this.perform('speak', { message });
  }
});

$(document).on('turbolinks:load', function () {
  $("#message_form").on('submit', function(e){
    e.preventDefault();
    let message = $('#message_to_sent').val();
    if (message.length > 0) {
      chatChannel.speak(message);
      $('#message_to_sent').val('')
    }
  });
})
