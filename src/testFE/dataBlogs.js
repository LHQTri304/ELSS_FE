let num = 20;
const randomImg = () => {
  num++;
  return 'https://picsum.photos/' + num.toString();
};
export default dataBlogs = [
  {
    ID: 1,
    img: randomImg(),
    fulName: "GameMaster123",
    header: "Chiến thuật chơi game MOBA hiệu quả",
    content: "Mọi người có thể chia sẻ kinh nghiệm và chiến thuật chơi game MOBA như Liên Minh Huyền Thoại hay Dota 2 không? Mình mới chơi và gặp khó khăn trong việc chọn tướng và phối hợp với đồng đội",
    comments: [
      {
        userName: "ProGamer1",
        img: randomImg(),
        content: "Mình thấy bạn nên chọn tướng hỗ trợ để phối hợp tốt hơn với đồng đội, như Lulu hoặc Janna. Cố gắng chơi theo chiến thuật tập thể nhé!",
        dateComment: "2024-11-27",
        replies: [
          {
            userName: "GameMaster123",
            img: randomImg(),
            content: "Cảm ơn bạn, mình sẽ thử ngay! Hy vọng có thể chiến thắng với đội của mình.",
            dateComment: "2024-11-27",
          },
        ],
      },
      {
        userName: "Mobakiller23",
        img: randomImg(),
        content: "Lỗi này thường xảy ra với những người mới chơi, bạn nên luyện tập ít nhất 5 trận với bot trước khi tham gia đấu xếp hạng.",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "GameMaster123",
            img: randomImg(),
            content: "Mình đã thử, nhưng vẫn khó khăn khi chơi cùng đồng đội. Mình sẽ luyện thêm!",
            dateComment: "2024-11-28",
          },
        ],
      },
      {
        userName: "NoobPlayer",
        img: randomImg(),
        content: "Mình cũng mới chơi và cảm thấy rất khó để phối hợp với team. Mọi người có mẹo gì để cải thiện không?",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "ProGamer1",
            img: randomImg(),
            content: "Ngoài chọn tướng hỗ trợ, bạn nên tập cách giao tiếp và đưa ra chiến thuật cụ thể ngay từ đầu game nhé.",
            dateComment: "2024-11-28",
          },
          {
            userName: "GameMaster123",
            img: randomImg(),
            content: "Cảm ơn bạn, mình sẽ thử tạo chiến thuật với đồng đội trong các trận đấu tới!",
            dateComment: "2024-11-28",
          },
        ],
      },
    ],
    likes: 10,
  },
  {
    ID: 2,
    img: randomImg(),
    fulName: "PixelWarrior",
    header: "Đánh giá game nhập vai XYZ",
    content: "Mình vừa chơi thử game nhập vai XYZ mới ra mắt tuần trước. Đồ họa đẹp, cốt truyện hấp dẫn nhưng hệ thống chiến đấu còn nhiều lỗi. Có ai đã chơi chưa? Chia sẻ cảm nhận nhé!",
    comments: [
      {
        userName: "RetroGamer",
        img: randomImg(),
        content: "Game này khá ổn nhưng đúng là phần chiến đấu có vẻ chưa mượt mà. Mình hi vọng bản cập nhật sắp tới sẽ khắc phục được.",
        dateComment: "2024-11-28",
        replies: [],
      },
      {
        userName: "StrategyKing",
        img: randomImg(),
        content: "Cốt truyện thật sự hấp dẫn, nhưng lỗi chiến đấu làm giảm trải nghiệm. Mình cũng mong chờ bản vá lỗi.",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "PixelWarrior",
            img: randomImg(),
            content: "Mình cũng vậy, hi vọng sớm có bản update!",
            dateComment: "2024-11-28",
          },
        ],
      },
      {
        userName: "TechFanatic",
        img: randomImg(),
        content: "Đồ họa game rất đẹp, nhưng gameplay lại chưa thật sự cuốn hút. Có ai cảm thấy vậy không?",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "PixelWarrior",
            img: randomImg(),
            content: "Đúng vậy, mặc dù đồ họa rất đẹp nhưng phần gameplay còn thiếu sự mượt mà và dễ gây thất vọng.",
            dateComment: "2024-11-28",
          },
        ],
      },
    ],
    likes: 302,
  },
  {
    ID: 3,
    img: randomImg(),
    fulName: "RetroGamer",
    header: "Tìm kiếm game cổ điển hay",
    content: "Mình là fan của các game cổ điển như Mario, Contra. Mọi người có thể gợi ý thêm những game cổ điển hay và đáng chơi không? Cảm ơn nhiều!",
    comments: [
      {
        userName: "ClassicGamer",
        img: randomImg(),
        content: "Nếu bạn thích Contra thì thử Castlevania hoặc Mega Man nhé, chúng cũng rất vui nhộn và khó đấy!",
        dateComment: "2024-11-27",
        replies: [],
      },
      {
        userName: "PixelFanatic",
        img: randomImg(),
        content: "Tôi thấy Super Mario World là game hay nhất trong thể loại cổ điển. Bạn có thể thử thử sức với nó!",
        dateComment: "2024-11-27",
        replies: [
          {
            userName: "RetroGamer",
            img: randomImg(),
            content: "Mình đã thử Super Mario World rồi, nhưng rất muốn tìm thêm nhiều game khác nữa. Ai có thêm gợi ý không?",
            dateComment: "2024-11-28",
          },
        ],
      },
      {
        userName: "ArcadeMaster",
        img: randomImg(),
        content: "Street Fighter 2 và Pac-Man cũng là những tựa game cổ điển không thể bỏ qua. Cùng một chút đấu võ và thử thách!",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 3,
  },
  {
    ID: 4,
    img: randomImg(),
    fulName: "SpeedRunner",
    header: "Kỷ lục speedrun mới",
    content: "Vừa phá kỷ lục speedrun trong Super Mario Odyssey với thời gian 1:14:23. Ai cũng thích speedrun thì giao lưu nào!",
    comments: [
      {
        userName: "FastRunnerX",
        img: randomImg(),
        content: "Wow, 1:14:23 là một kỷ lục tuyệt vời! Chia sẻ cách bạn luyện tập đi!",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "SpeedRunner",
            img: randomImg(),
            content: "Mình luyện tập mỗi ngày 1-2 giờ và chủ yếu tập những đoạn khó nhất. Hãy thử đi, bạn sẽ cải thiện nhanh chóng!",
            dateComment: "2024-11-28",
          },
        ],
      },
      {
        userName: "TimeChaser",
        img: randomImg(),
        content: "Chúc mừng bạn đã phá kỷ lục! Còn kỷ lục nào bạn đang nhắm tới không?",
        dateComment: "2024-11-28",
        replies: [],
      },
      {
        userName: "RunnerPro",
        img: randomImg(),
        content: "Mình đang nhắm kỷ lục trong Celeste. Nếu bạn có mẹo gì thì chia sẻ giúp mình nhé!",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "SpeedRunner",
            img: randomImg(),
            content: "Celeste có những đoạn khó nhưng rất thú vị. Hãy luyện tập thật nhiều và kiên nhẫn. Đừng bỏ cuộc!",
            dateComment: "2024-11-28",
          },
        ],
      },
    ],
    likes: 450,
  },
  {
    ID: 5,
    img: randomImg(),
    fulName: "StrategyKing",
    header: "Hướng dẫn chơi Civilization VI",
    content: "Hướng dẫn chi tiết cách xây dựng đế chế trong Civilization VI, từ chọn dân tộc đến chiến thuật ngoại giao. Link bài viết chi tiết trong phần bình luận!",
    comments: [
      {
        userName: "EmpireBuilder",
        img: randomImg(),
        content: "Cảm ơn bạn! Mình vừa học xong chiến thuật xây dựng đế chế cổ đại, sẽ thử nghiệm ngay.",
        dateComment: "2024-11-28",
        replies: [],
      },
      {
        userName: "CivilizationMaster",
        img: randomImg(),
        content: "Bài hướng dẫn rất chi tiết. Mình sẽ thử theo chiến thuật bạn đưa ra. Hy vọng nó hiệu quả!",
        dateComment: "2024-11-28",
        replies: [
          {
            userName: "StrategyKing",
            img: randomImg(),
            content: "Chúc bạn thành công! Hãy để lại feedback nếu có gì cần cải thiện nhé.",
            dateComment: "2024-11-28",
          },
        ],
      },
    ],
    likes: 245,
  },
  {
    ID: 6,
    img: randomImg(),
    fulName: "VRDreamer",
    header: "Trải nghiệm VR độc đáo",
    content: "Mình vừa thử qua game VR mới 'Reality Clash'. Cảm giác như bước vào thế giới thực tế ảo, rất đáng để thử nếu bạn là fan của công nghệ VR.",
    comments: [
      {
        userName: "VRTechie",
        img: randomImg(),
        content: "Game này mình cũng đã chơi, cảm giác thật sự rất tuyệt vời. Tính năng tương tác tốt, nhưng có một số điểm vẫn cần cải thiện.",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 120,
  },
  {
    ID: 7,
    img: randomImg(),
    fulName: "IndieExplorer",
    header: "Game indie hay tháng này",
    content: "Khám phá các game indie như Hollow Knight, Stardew Valley. Cực kỳ sáng tạo và gây nghiện!",
    comments: [
      {
        userName: "IndieFanatic",
        img: randomImg(),
        content: "Cả hai game này mình đều chơi rồi. Stardew Valley đặc biệt thú vị, nhưng Hollow Knight lại có gameplay rất cuốn.",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 67,
  },
  {
    ID: 8,
    img: randomImg(),
    fulName: "LootHunter",
    header: "Chia sẻ mẹo tìm loot",
    content: "Có mẹo nào để tìm được loot hiếm trong Diablo IV không? Mình cần một vài món đồ Legendary mà mãi không thấy.",
    comments: [
      {
        userName: "LootMaster",
        img: randomImg(),
        content: "Thử đi săn boss ở khu vực hoang dã, loot Legendary sẽ xuất hiện nhiều hơn ở các khu vực này.",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 32,
  },
  {
    ID: 9,
    img: randomImg(),
    fulName: "CosplayQueen",
    header: "Cosplay nhân vật game",
    content: "Mình vừa hoàn thiện bộ cosplay nhân vật Aloy từ Horizon Zero Dawn. Mọi người thấy sao? Ai yêu thích cosplay thì chia sẻ bộ của bạn nhé!",
    comments: [
      {
        userName: "CosplayMaster",
        img: randomImg(),
        content: "Wow, bộ cosplay của bạn đẹp quá! Bạn làm như thế nào để tạo được độ chi tiết vậy?",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 210,
  },
  {
    ID: 10,
    img: randomImg(),
    fulName: "PuzzleMaster",
    header: "Game giải đố hại não",
    content: "Game giải đố gần đây mình thích nhất là 'The Witness'. Bạn nào có các game giải đố tương tự thì giới thiệu mình với!",
    comments: [
      {
        userName: "MindBender",
        img: randomImg(),
        content: "Nếu bạn thích 'The Witness' thì thử chơi 'The Talos Principle', nó cũng khá giống về kiểu giải đố.",
        dateComment: "2024-11-28",
        replies: [],
      },
    ],
    likes: 90,
  },
];
