(function() {
  window.BotchanSetting = function(type, field, name, options) {
    this.field = field;
    this.element = $('#templates .setting_container').clone().appendTo('#container .settings');
    $('.header', this.element).text(name);
    this[type](options);
  };

  Botchan.prototype.text(options) {
    var self = this;
    $('.options', this.element).append(
      $('<input/>')
      .attr('type', 'text')
      .addClass('textbox')
      .on('change', function() {
        ConfigController[self.field] = $(this).val();
        ConfigController.save();
      })
    );
  };
})();
