const {
  generateWAMessageFromContent,
  prepareWAMessageMedia,
  proto,
} = require("@seaavey/baileys");

class Button {
  constructor(conn) {
    this.headers = {};
    this.caption = "";
    this.text = "";
    this.buttons = [];
    this.object = conn;
  }

  AddCaption(caption) {
    this.caption = caption;
  }

  AddText(text) {
    this.text = text;
  }

  async addButtons(buttons, data = {}) {
    if (buttons === "reply") {
      this.buttons.push({
        name: "quick_reply",
        buttonParamsJson: JSON.stringify({
          display_text: data.display_text || "test",
          id: data.id || "test",
        }),
      });
    } else if (buttons === "url") {
      this.buttons.push({
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: data.display_text || "test",
          url: data.url || "https://google.com",
          merchant_url: data.merchant_url || "https://google.com",
        }),
      });
    } else if (buttons === "call") {
      this.buttons.push({
        name: "cta_call",
        buttonParamsJson: JSON.stringify({
          display_text: data.display_text,
          id: data.id,
        }),
      });
    } else if (buttons === "address") {
      this.buttons.push({
        name: "address_message",
        buttonParamsJson: JSON.stringify({
          display_text: data.display_text,
          id: data.id,
        }),
      });
    } else if (buttons === "list") {
      this.buttons.push({
        name: "single_select",
        buttonParamsJson: JSON.stringify({
          title: data.title,
          sections: data.sections,
        }),
      });
    }
  }

  async addImage(image) {
    this.headers = {
      image: {
        url: image,
      },
    };
  }

  async init(jid, quoted) {
    let msg = await generateWAMessageFromContent(
      jid,
      {
        viewOnceMessage: {
          message: {
            interactiveMessage: {
              body: {
                text: this.text,
              },
              carouselMessage: {
                cards: [
                  {
                    header: proto.Message.InteractiveMessage.Header.create({
                      ...(await prepareWAMessageMedia(
                        {
                          ...this.headers,
                        },
                        { upload: this.object.waUploadToServer }
                      )),
                      title: this.caption,
                      subtitle: "",
                      hasMediaAttachment: false,
                    }),
                    body: {
                      text: null,
                    },
                    nativeFlowMessage: {
                      buttons: this.buttons,
                    },
                  },
                ],
                messageVersion: 1,
              },
            },
          },
        },
      },
      {}
    );

    await this.object.relayMessage(msg.key.remoteJid, msg.message, {
      messageId: msg.key.id,
      quoted,
    });
  }
}

module.exports = Button;
