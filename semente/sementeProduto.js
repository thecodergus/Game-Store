const Product = require('../models/product');

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/loja");

const products = [
  new Product({
    imagemPasta: 'https://upload.wikimedia.org/wikipedia/pt/thumb/a/aa/The_Elder_Scrolls_5_Skyrim_capa.png/270px-The_Elder_Scrolls_5_Skyrim_capa.png',
    titulo: 'The Elder Scrolls V: Skyrim',
    descricao: 'The Elder Scrolls V: Skyrim é um RPG eletrônico desenvolvido pela Bethesda Games Studios e publicado pela Bethesda Softworks. É o quinto jogo principal da série The Elder Scrolls, seguindo The Elder Scrolls IV: Oblivion. Foi lançado em 11 de novembro de 2011 para PlayStation 3, Xbox 360 e PC. É o primeiro jogo ocidental da história a receber 40/40 (nota máxima) na conceituada revista japonesa Famitsu. O Jogo Conseguiu três prêmios no VGA 2011, incluindo melhor jogo do ano.',
    preco: 97
  }),
  new Product({
    imagemPasta: 'https://images.livrariasaraiva.com.br/imagemnet/imagem.aspx/?pro_id=9362262&qld=90&l=430&a=-1',
    titulo: 'Resident Evil 4',
    descricao: 'A história de Resident Evil 4 segue o agente especial do governo dos Estados Unidos Leon S. Kennedy, que é enviado em uma missão para resgatar Ashley Graham, filha do presidente americano, que foi raptada por uma seita macabra. Ele viaja para uma área rural da Espanha, onde luta contra hordas de moradores violentos e monstros mutantes , e se reúne com a misteriosa espiã Ada Wong.',
    preco: 32
  }),
  new Product({
    imagemPasta: 'https://static.gamevicio.com/imagens/games/3/293-age-of-empires-iii.jpg',
    titulo: 'Age of Empires III',
    descricao: 'O grande diferencial deste jogo em relação às versões anteriores é que nessa versão o jogador ganha pontos de experiência ao coletar recursos, criar unidades ou construções e ao destruir unidades e construções inimigas para melhorar a sua capital. Com esses pontos de experiência, o jogador pode escolher "cartas" que servem para adquirir mais tropas, recursos ou melhorias e também recebe pontos para alterar a aparência da capital. Esses dois fatores tornam o jogo mais interessante pois um bom baralho pode fornecer uma excelente base para os fatores econômicos ou militares de sua colônia. As cartas são muito variadas: dependendo de seu estilo de baralho você pode formar um exército inteiro apenas usando suas cartas, ou fortalecer sua economia.',
    preco: 209
  }),
  new Product({
    imagemPasta: 'https://images-submarino.b2w.io/produtos/01/00/item/127373/6/127373656SZ.jpg',
    titulo: 'Lego Star Wars: O Despertar Da Força',
    descricao: 'LEGO® Star Wars: O Despertar da Força marca o retorno incrível da série de videogames LEGO número 1 e leva os fãs para a nova aventura de Star Wars de forma inédita. Os jogadores podem reviver a ação épica do sucesso dos cinemas de uma forma que só LEGO pode oferecer, com todo o enredo de Star Wars: O Despertar da Força recontado sob a ótica inteligente e divertida de LEGO. O jogo também trará conteúdo exclusivo que leconstá os jogadores a aventuras entre Star Wars: Episódio VI: O Retorno de Jedi e Star Wars: O Despertar da Força, oferecendo uma nova visão sobre o recente filme e seus personagens.',
    preco: 169
  }),
  new Product({
    imagemPasta: 'https://images-submarino.b2w.io/produtos/01/00/item/122163/8/122163887SZ.jpg',
    titulo: 'Mortal Kombat X',
    descricao: 'Mortal Kombat X é o próximo capítulo da esperada, lendária e aclamada franquia de jogos de luta da NetherRealm Studios, marcando a estreia da icônica série na nova geração. O jogo combina apresentação cinematográfica com jogabilidade inédita, oferecendo a mais brutal experiência de combate de todos os tempos, trazendo uma nova experiência completamente conectada que arremessa jogadores em uma competição online persistente, na qual toda luta conta na batalha global pela supremacia.',
    preco: 79
  }),
  new Product({
    imagemPasta: 'https://images-submarino.b2w.io/produtos/01/00/item/124776/7/124776759_1GG.jpg',
    titulo: "Uncharted 4: A Thief's End",
    descricao: "Todo tesouro tem seu preço Vários anos após sua última aventura, o aposentado caçador de tesouros, Nathan Drake, é forçado a voltar para o mundo dos ladrões. Agora com sua vida pessoal em jogo, Drake embarca em uma jornada pelo mundo em busca de uma conspiração histórica por trás de um famoso tesouro pirata.",
    preco: 108
  }),
  new Product({
    imagemPasta: 'https://images-submarino.b2w.io/produtos/01/00/item/126036/2/126036287SZ.jpg',
    titulo: "The Witcher 3: Wild Hunt",
    descricao: "The Witcher 3: Wild Hunt é um jogo de RPG em um mundo amplo e dinâmico, não linear e de fantasia sombria baseado em uma história conduzida pelo próprio personagem, pelas escolhas do jogador e com combates estratégicos. O terceiro capítulo desta saga premiada aprimora todos os aspectos da série, com um sistema de combate mais fluido, novos Witcher Senses e Monster Hunting, alquimia aperfeiçoada, sinais mágicos, sistemas de habilidades e muitas outras inovações.",
    preco: 99
  })
];

let done = 0;
products.forEach((product) => {
  product.save((err, result) => {
    done++;
    if (done === 6) {
      mongoose.disconnect();
    }
  });
});