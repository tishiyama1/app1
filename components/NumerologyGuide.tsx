import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BookOpen, Star, Users } from 'lucide-react';

const numerologyNumbers = [
  {
    number: 1,
    title: 'リーダー・開拓者',
    personality: 'リーダーシップがあり、独立心が強く、新しいことを始めるのが得意です。',
    strengths: ['決断力', '独立性', '創造性', '野心', 'パイオニア精神'],
    challenges: ['自己中心的になりやすい', '他人との協調が苦手', '批判に敏感'],
    relationships: '強いリーダーシップで周囲を導きますが、時として独善的になることも。家族や友人、同僚の意見も尊重し、協調性を意識することが大切です。',
    color: 'bg-red-50 border-red-200'
  },
  {
    number: 2,
    title: '協調者・平和主義者',
    personality: '協調性があり、他人との調和を重視します。感受性が豊かで優しい性格です。',
    strengths: ['協調性', '感受性', '忍耐力', '外交術', 'バランス感覚'],
    challenges: ['優柔不断', '自信不足', '過度に敏感', '依存しやすい'],
    relationships: '相手を支えることに喜びを感じ、調和の取れた関係を築きます。家族や友人から信頼される存在ですが、時には自分の意見もしっかりと伝えることが大切です。',
    color: 'bg-blue-50 border-blue-200'
  },
  {
    number: 3,
    title: '表現者・楽天家',
    personality: '表現力豊かで明るく、人を楽しませることが得意です。創造性に富んでいます。',
    strengths: ['表現力', '創造性', '楽観性', 'コミュニケーション能力', '芸術的センス'],
    challenges: ['散漫になりやすい', '表面的', '責任感に欠ける', '気分屋'],
    relationships: 'どんな関係でも明るく楽しい雰囲気を作り出します。友人関係では中心的存在になりがちですが、深刻な話題や相手の感情にも寄り添うことを意識しましょう。',
    color: 'bg-yellow-50 border-yellow-200'
  },
  {
    number: 4,
    title: '建設者・実用主義者',
    personality: '安定を好み、コツコツと努力することができます。現実的で責任感が強いです。',
    strengths: ['安定性', '責任感', '実用性', '努力家', '信頼性'],
    challenges: ['頑固', '変化を嫌う', '融通が利かない', '保守的すぎる'],
    relationships: '堅実で信頼できる関係を築きます。家族や長期的な友人関係、ビジネスパートナーとして高く評価されますが、時には相手の新しいアイデアや変化も受け入れる柔軟性を持ちましょう。',
    color: 'bg-green-50 border-green-200'
  },
  {
    number: 5,
    title: '冒険者・自由人',
    personality: '自由を愛し、変化と冒険を求めます。好奇心旺盛で多才です。',
    strengths: ['自由性', '適応力', '好奇心', '多才', '冒険心'],
    challenges: ['飽きっぽい', '不安定', '責任回避', '衝動的'],
    relationships: '刺激的で自由な関係を好み、様々な人とのネットワークを築くのが得意です。束縛を嫌うため、相手に適度な距離感を求めますが、家族や親しい友人の安定への欲求も理解することが大切です。',
    color: 'bg-purple-50 border-purple-200'
  },
  {
    number: 6,
    title: '愛情家・奉仕者',
    personality: '愛情深く、家族や友人を大切にします。奉仕の精神に溢れています。',
    strengths: ['愛情深さ', '責任感', '奉仕精神', '家族思い', '癒しの力'],
    challenges: ['おせっかい', '依存関係を作る', '自己犠牲的', '完璧主義'],
    relationships: '深い愛情と思いやりで周囲を包み込みます。家族関係では中心的な役割を果たし、友人からも相談される存在ですが、時として過保護になることも。相手の独立性も尊重しましょう。',
    color: 'bg-pink-50 border-pink-200'
  },
  {
    number: 7,
    title: '思索者・神秘家',
    personality: '内省的で精神性を重視します。分析力があり、深く物事を考えます。',
    strengths: ['分析力', '直感力', '精神性', '独立性', '洞察力'],
    challenges: ['孤立しやすい', '現実逃避', '批判的', '神経質'],
    relationships: '深い精神的なつながりを重視し、表面的な関係よりも少数の深い関係を好みます。感情表現が苦手で孤立しがちですが、信頼できる相手との心の交流を大切にしましょう。',
    color: 'bg-indigo-50 border-indigo-200'
  },
  {
    number: 8,
    title: '実力者・野心家',
    personality: '物質的成功を求め、組織力があります。野心的で達成欲が強いです。',
    strengths: ['組織力', '野心', '実行力', 'リーダーシップ', '物質的成功'],
    challenges: ['物質主義', '支配的', '仕事中毒', '感情を軽視'],
    relationships: '目標達成に向けて共に努力できる関係を重視します。ビジネスパートナーや同僚との関係は良好ですが、成功を優先して人間関係を軽視しがちです。家族や友人への配慮も忘れないようにしましょう。',
    color: 'bg-orange-50 border-orange-200'
  },
  {
    number: 9,
    title: '完成者・人道主義者',
    personality: '理想主義的で人道的です。広い視野を持ち、人類の幸福を願います。',
    strengths: ['理想主義', '寛容性', '人道主義', '直感力', '芸術的感性'],
    challenges: ['理想が高すぎる', '現実性に欠ける', '感情的', '完璧主義'],
    relationships: '深い愛情と理解で相手を受け入れ、人道的な視点から多様な人々と関わります。理想が高く完璧を求めがちですが、現実的な関係性の構築も大切にしましょう。',
    color: 'bg-teal-50 border-teal-200'
  }
];

export default function NumerologyGuide() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="h-8 w-8 text-blue-500" />
          <h2 className="text-3xl">数秘術ガイド</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          生命数1から9まで、それぞれの数字が持つ特徴と人間関係の傾向について詳しく解説します。
          あなたの数字の特徴を理解して、恋愛・友情・家族・ビジネスなど様々な関係でより良いコミュニケーションを築きましょう。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {numerologyNumbers.map((item) => (
          <Card key={item.number} className={`${item.color} hover:shadow-lg transition-shadow`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center border-2 border-current">
                  <span className="text-xl font-bold">{item.number}</span>
                </div>
                <div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{item.personality}</p>
              
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  長所
                </h4>
                <div className="flex flex-wrap gap-1">
                  {item.strengths.map((strength, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">注意点</h4>
                <ul className="text-xs space-y-1 text-muted-foreground">
                  {item.challenges.map((challenge, index) => (
                    <li key={index} className="flex items-start gap-1">
                      <span className="text-orange-500 mt-0.5">•</span>
                      {challenge}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-500" />
                  人間関係の傾向
                </h4>
                <p className="text-xs text-muted-foreground">{item.relationships}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardHeader>
          <CardTitle className="text-center">数秘術について</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            数秘術は、古代ギリシャの数学者ピタゴラスによって体系化されたとされる占術です。
            生年月日や名前から導き出した数字から、その人の性格や運命、相性などを読み解きます。
          </p>
          <p>
            生命数の計算方法：誕生日の全ての数字を足し合わせ、一桁になるまで計算を続けます。
            （例：1990年5月15日 → 1+9+9+0+5+1+5 = 30 → 3+0 = 3）
          </p>
          <p>
            このサイトでの相性診断は参考程度にお楽しみください。
            真の良い関係は、恋愛・友情・家族・ビジネスを問わず、お互いの理解と努力によって築かれるものです。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}