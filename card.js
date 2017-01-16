(function () {
  // カードの枚数
  var CARD_NUM = 10;

  // カードの配列を作成
  function makeCards() {
    var i;
    var cards = [];

    for (i = CARD_NUM; i--;) {
      cards[i] = {
        value: Math.floor(i / 2),
        isDone: false,
        isOpend: false,
      };
    }

    // シャッフル
    for (i = CARD_NUM; i--;) {
      var r = Math.floor(Math.random() * i);
      var tmp = cards[i];
      cards[i] = cards[r];
      cards[r] = tmp;
    }

    return cards;
  }

  // 初期データを作成
  function getInitData() {
    return {
      cards: makeCards(),
      openedIndexes: [],
      doneNum: 0,
      clickNum: 0,
    };
  }

  var app = new Vue({
    el: '#app',
    data: getInitData(),
    methods: {
      openCard: function (index) {
        // クリックしたカード、前回のカード、前々回のカード
        var currentCard = this.cards[index];
        var prevCard = this.cards[this.openedIndexes[0]];
        var prevCard2 = this.cards[this.openedIndexes[1]];

        // 2枚目で、前回と同じなら終了
        if (this.openedIndexes.length === 1 && currentCard === prevCard) return;

        // すでに2枚開いていたら両方閉じる
        if (this.openedIndexes.length === 2) {
          this.$set(prevCard, 'isOpened', false);
          this.$set(prevCard2, 'isOpened', false);
          this.openedIndexes = [];
        }

        this.clickNum++;
        this.$set(currentCard, 'isOpened', true);

        // 1枚目
        if (this.openedIndexes.length === 0) {
          this.openedIndexes.unshift(index);
          return;
        }

        // 2枚目でアタリの場合
        if (currentCard.value === prevCard.value) {
          this.$set(currentCard, 'isDone', true);
          this.$set(prevCard, 'isDone', true);
          this.openedIndexes = [];

          this.doneNum += 2;
          if (this.doneNum === CARD_NUM) {
            setTimeout(this.clear);
          }

          return;
        }

        // 2枚目でハズレの場合
        this.openedIndexes.unshift(index);
      },

      clear: function () {
        alert('cleared!');

        var newData = getInitData();
        Object.keys(newData).forEach(function (key) {
          this.$data[key] = newData[key];
        }, this);
      },
    },
  });
}());
