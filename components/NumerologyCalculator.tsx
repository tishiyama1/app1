import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Users, Star, Network } from 'lucide-react';

interface CompatibilityResult {
  person1Number: number;
  person2Number: number;
  compatibilityScore: number;
  description: string;
  advice: string;
  rating: 'excellent' | 'good' | 'fair' | 'challenging';
}

const numberMeanings: Record<number, string> = {
  1: 'リーダー、独立性、創造性',
  2: '協調性、感受性、バランス',
  3: '表現力、楽観性、創造性',
  4: '安定性、実用性、努力家',
  5: '自由、冒険、変化',
  6: '愛情、責任感、家族思い',
  7: '神秘性、分析力、内省',
  8: '物質的成功、野心、組織力',
  9: '人道主義、理想主義、寛容'
};

const compatibilityMatrix: Record<string, CompatibilityResult> = {
  '1-1': { person1Number: 1, person2Number: 1, compatibilityScore: 75, description: '同じリーダー気質を持つ二人。お互いの野心や目標を理解し合えますが、主導権争いが起こることもあります。ビジネスパートナーとしては強力な組み合わせです。', advice: 'お互いの独立性を尊重し、役割分担を明確にして協力することを学びましょう。競争より協調を意識することが大切です。', rating: 'good' },
  '1-2': { person1Number: 1, person2Number: 2, compatibilityScore: 85, description: 'リーダーとサポーターの理想的な組み合わせ。1番が方向性を決め、2番が調整・サポートする関係。恋愛、友情、ビジネスすべてで良好な関係を築けます。', advice: '2番の感受性や調整能力を1番が理解し、1番の決断力や行動力を2番が支えることで素晴らしい関係になります。', rating: 'excellent' },
  '1-3': { person1Number: 1, person2Number: 3, compatibilityScore: 80, description: '創造性豊かで活動的な組み合わせ。楽しく刺激的な関係を築けます。プロジェクトの企画やクリエイティブな活動で力を発揮する関係です。', advice: '3番の自由な発想やアイデアを1番が具現化し、お互いを励まし合いましょう。互いの才能を認め合うことが大切です。', rating: 'good' },
  '1-4': { person1Number: 1, person2Number: 4, compatibilityScore: 70, description: '野心家と安定志向の組み合わせ。価値観の違いがありますが、補完し合える関係。ビジネスでは1番のビジョンを4番が堅実に実現する良いパートナーシップになります。', advice: '1番は4番の安定性や継続力を、4番は1番の革新性や冒険心を理解し合うことが大切です。', rating: 'fair' },
  '1-5': { person1Number: 1, person2Number: 5, compatibilityScore: 75, description: '冒険心旺盛な二人。新しいことに挑戦し、刺激的で変化に富んだ関係を築けます。友人として、また共同事業のパートナーとして優秀な組み合わせです。', advice: 'お互いの自由と独立性を尊重し、束縛しすぎないことが大切です。新しい挑戦を一緒に楽しみましょう。', rating: 'good' },
  '1-6': { person1Number: 1, person2Number: 6, compatibilityScore: 85, description: 'リーダーと愛情深いサポーターの組み合わせ。家族関係、友人関係、チームワークすべてで安定した関係を築けます。6番の包容力が1番を支えます。', advice: '1番は6番の愛情やサポートを受け入れ、6番は1番の野心や目標を理解して支えることで深い信頼関係が生まれます。', rating: 'excellent' },
  '1-7': { person1Number: 1, person2Number: 7, compatibilityScore: 60, description: '行動派と思考派の組み合わせ。アプローチが異なるため、お互いを理解するのに時間がかかるかもしれません。しかし学び合える関係です。', advice: '7番の深い洞察力や分析能力を1番が尊重し、1番の行動力や決断力を7番が学ぶことで互いに成長できます。', rating: 'challenging' },
  '1-8': { person1Number: 1, person2Number: 8, compatibilityScore: 80, description: '野心的な二人の組み合わせ。ビジネスや目標達成において、成功への道を共に歩める強力なパートナーシップを築けます。', advice: '競争ではなく協力の精神で、共通の目標に向かって進みましょう。お互いの強みを活かし合うことが成功の鍵です。', rating: 'good' },
  '1-9': { person1Number: 1, person2Number: 9, compatibilityScore: 75, description: 'リーダーと理想主義者の組み合わせ。社会貢献や大きな目標に向かって活動できる意義深い関係です。お互いの価値観を理解し合えます。', advice: '9番の理想や人道的な視点を1番が実現し、1番の行動力や決断力を9番が方向付けることで素晴らしい成果を生み出せます。', rating: 'good' },
  '2-2': { person1Number: 2, person2Number: 2, compatibilityScore: 90, description: '協調性豊かな二人。平和で調和の取れた関係を築けます。', advice: 'お互いの感受性を大切にし、優しさを分かち合いましょう。', rating: 'excellent' },
  '2-3': { person1Number: 2, person2Number: 3, compatibilityScore: 85, description: '感受性と表現力の美しい組み合わせ。創造的で楽しい関係になります。', advice: '2番は3番の明るさを、3番は2番の繊細さを大切にしましょう。', rating: 'excellent' },
  '2-4': { person1Number: 2, person2Number: 4, compatibilityScore: 80, description: '協調性と安定性の組み合わせ。堅実で長続きする関係を築けます。', advice: 'お互いの安定を求める気持ちを理解し、支え合いましょう。', rating: 'good' },
  '2-5': { person1Number: 2, person2Number: 5, compatibilityScore: 65, description: '安定志向と自由志向の組み合わせ。価値観の違いを乗り越える必要があります。', advice: '2番は5番の自由を尊重し、5番は2番の安定への願いを理解しましょう。', rating: 'fair' },
  '2-6': { person1Number: 2, person2Number: 6, compatibilityScore: 95, description: '愛情深い二人の理想的な組み合わせ。家庭的で温かい関係を築けます。', advice: 'お互いの愛情を素直に表現し、家族や友人も大切にしましょう。', rating: 'excellent' },
  '2-7': { person1Number: 2, person2Number: 7, compatibilityScore: 70, description: '感受性と神秘性の組み合わせ。深い精神的なつながりを持てる関係。', advice: '2番は7番の内省を理解し、7番は2番の感情を大切にしましょう。', rating: 'fair' },
  '2-8': { person1Number: 2, person2Number: 8, compatibilityScore: 75, description: '協調性と野心の組み合わせ。2番が8番をサポートする関係になることが多いです。', advice: '8番は2番の支えに感謝し、2番は8番の目標を理解して応援しましょう。', rating: 'good' },
  '2-9': { person1Number: 2, person2Number: 9, compatibilityScore: 85, description: '協調性と理想主義の美しい組み合わせ。人道的な活動で絆を深められます。', advice: 'お互いの優しさを大切にし、社会に貢献する活動を一緒に行いましょう。', rating: 'excellent' },
  '3-3': { person1Number: 3, person2Number: 3, compatibilityScore: 85, description: '創造性豊かで楽しい二人。明るく活動的な関係を築けます。', advice: 'お互いの創造性を刺激し合い、楽しい時間を共有しましょう。', rating: 'excellent' },
  '3-4': { person1Number: 3, person2Number: 4, compatibilityScore: 70, description: '自由奔放と安定志向の組み合わせ。バランスを取ることが課題です。', advice: '3番は4番の安定性を、4番は3番の創造性を理解し合いましょう。', rating: 'fair' },
  '3-5': { person1Number: 3, person2Number: 5, compatibilityScore: 90, description: '自由で冒険的な二人。刺激的で楽しい関係を築けます。', advice: 'お互いの自由を尊重し、新しい体験を一緒に楽しみましょう。', rating: 'excellent' },
  '3-6': { person1Number: 3, person2Number: 6, compatibilityScore: 80, description: '表現力と愛情の組み合わせ。温かく楽しい家庭を築けます。', advice: '3番は6番の愛情を受け入れ、6番は3番の表現を支えましょう。', rating: 'good' },
  '3-7': { person1Number: 3, person2Number: 7, compatibilityScore: 65, description: '表現と内省の組み合わせ。お互いを理解するのに時間がかかるかもしれません。', advice: '3番は7番の深さを、7番は3番の明るさを学び合いましょう。', rating: 'fair' },
  '3-8': { person1Number: 3, person2Number: 8, compatibilityScore: 75, description: '創造性と野心の組み合わせ。3番のアイデアを8番が実現する関係。', advice: '3番は8番の野心を理解し、8番は3番の創造性を活用しましょう。', rating: 'good' },
  '3-9': { person1Number: 3, person2Number: 9, compatibilityScore: 85, description: '表現力と理想主義の組み合わせ。創造的で意義深い活動ができる関係。', advice: 'お互いの理想を表現し、世界をより良くする活動を一緒に行いましょう。', rating: 'excellent' },
  '4-4': { person1Number: 4, person2Number: 4, compatibilityScore: 85, description: '安定志向の二人。堅実で信頼できる関係を築けます。', advice: 'お互いの努力を認め合い、共通の目標に向かって着実に進みましょう。', rating: 'excellent' },
  '4-5': { person1Number: 4, person2Number: 5, compatibilityScore: 60, description: '安定と変化の組み合わせ。価値観の違いを受け入れることが重要です。', advice: '4番は5番の自由を、5番は4番の安定への欲求を理解しましょう。', rating: 'challenging' },
  '4-6': { person1Number: 4, person2Number: 6, compatibilityScore: 90, description: '安定性と愛情の理想的な組み合わせ。堅実で温かい家庭を築けます。', advice: 'お互いの価値観を大切にし、家族や友人との時間を大切にしましょう。', rating: 'excellent' },
  '4-7': { person1Number: 4, person2Number: 7, compatibilityScore: 75, description: '実用性と神秘性の組み合わせ。お互いの違いから学び合える関係。', advice: '4番は7番の洞察力を、7番は4番の実用性を尊重しましょう。', rating: 'good' },
  '4-8': { person1Number: 4, person2Number: 8, compatibilityScore: 85, description: '安定性と野心の素晴らしい組み合わせ。着実に成功を築ける関係。', advice: '4番の堅実さと8番の野心を組み合わせて、大きな成果を目指しましょう。', rating: 'excellent' },
  '4-9': { person1Number: 4, person2Number: 9, compatibilityScore: 70, description: '実用性と理想主義の組み合わせ。現実と理想のバランスが課題です。', advice: '4番は9番の理想を支え、9番は4番の現実的なアプローチを学びましょう。', rating: 'fair' },
  '5-5': { person1Number: 5, person2Number: 5, compatibilityScore: 80, description: '自由で冒険的な二人。刺激的だが不安定になりがちな関係。', advice: 'お互いの自由を尊重しつつ、時には安定も求めることを学びましょう。', rating: 'good' },
  '5-6': { person1Number: 5, person2Number: 6, compatibilityScore: 70, description: '自由と愛情の組み合わせ。5番の自由と6番の安定欲求の調整が必要。', advice: '5番は6番の愛情を、6番は5番の自由への願いを理解しましょう。', rating: 'fair' },
  '5-7': { person1Number: 5, person2Number: 7, compatibilityScore: 75, description: '冒険と内省の組み合わせ。お互いの違いから新しい発見がある関係。', advice: '5番は7番の深さを、7番は5番の活動性を学び合いましょう。', rating: 'good' },
  '5-8': { person1Number: 5, person2Number: 8, compatibilityScore: 70, description: '自由と野心の組み合わせ。5番の自由さと8番の統制のバランスが課題。', advice: '5番は8番の目標を理解し、8番は5番の自由を尊重しましょう。', rating: 'fair' },
  '5-9': { person1Number: 5, person2Number: 9, compatibilityScore: 80, description: '自由と理想主義の組み合わせ。世界を変える冒険ができる関係。', advice: 'お互いの理想を追求し、自由な発想で世界に貢献しましょう。', rating: 'good' },
  '6-6': { person1Number: 6, person2Number: 6, compatibilityScore: 95, description: '愛情深い二人の理想的な組み合わせ。温かく支え合う関係を築けます。', advice: 'お互いの愛情を大切にし、家族や友人との絆を深めましょう。', rating: 'excellent' },
  '6-7': { person1Number: 6, person2Number: 7, compatibilityScore: 75, description: '愛情と神秘性の組み合わせ。深い精神的なつながりを持てる関係。', advice: '6番は7番の内面を、7番は6番の愛情を大切にしましょう。', rating: 'good' },
  '6-8': { person1Number: 6, person2Number: 8, compatibilityScore: 80, description: '愛情と野心の組み合わせ。6番が8番を支える温かい関係。', advice: '6番は8番の目標を応援し、8番は6番の愛情に感謝しましょう。', rating: 'good' },
  '6-9': { person1Number: 6, person2Number: 9, compatibilityScore: 90, description: '愛情と理想主義の美しい組み合わせ。人道的な活動で絆を深められます。', advice: 'お互いの愛情と理想を組み合わせて、世界をより良い場所にしましょう。', rating: 'excellent' },
  '7-7': { person1Number: 7, person2Number: 7, compatibilityScore: 80, description: '神秘的で深い二人。精神的なつながりが強い関係を築けます。', advice: 'お互いの内面を理解し合い、精神的な成長を共に目指しましょう。', rating: 'good' },
  '7-8': { person1Number: 7, person2Number: 8, compatibilityScore: 65, description: '内省と野心の組み合わせ。価値観の違いを理解し合うことが重要。', advice: '7番は8番の野心を、8番は7番の深い洞察力を尊重しましょう。', rating: 'fair' },
  '7-9': { person1Number: 7, person2Number: 9, compatibilityScore: 85, description: '神秘性と理想主義の組み合わせ。精神的で意義深い関係を築けます。', advice: 'お互いの精神性を高め合い、深い理解で結ばれた関係を築きましょう。', rating: 'excellent' },
  '8-8': { person1Number: 8, person2Number: 8, compatibilityScore: 75, description: '野心的な二人。成功への強い意志を共有しますが、競争になることも。', advice: '競争ではなく協力の精神で、共通の目標達成を目指しましょう。', rating: 'good' },
  '8-9': { person1Number: 8, person2Number: 9, compatibilityScore: 80, description: '野心と理想主義の組み合わせ。大きな成果を社会にもたらせる関係。', advice: '8番の実行力と9番の理想を組み合わせて、世界に影響を与えましょう。', rating: 'good' },
  '9-9': { person1Number: 9, person2Number: 9, compatibilityScore: 85, description: '理想主義者同士の組み合わせ。世界をより良くする活動で絆を深められます。', advice: 'お互いの理想を尊重し合い、人類の幸福のために活動しましょう。', rating: 'excellent' }
};

export default function NumerologyCalculator() {
  const [person1Name, setPerson1Name] = useState('');
  const [person1Date, setPerson1Date] = useState('');
  const [person2Name, setPerson2Name] = useState('');
  const [person2Date, setPerson2Date] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);

  const calculateLifeNumber = (dateString: string): number => {
    // 日付文字列から数字のみを抽出
    const digits = dateString.replace(/\D/g, '');
    let sum = 0;
    
    // 全ての数字を足す
    for (let digit of digits) {
      sum += parseInt(digit);
    }
    
    // 一桁になるまで足し続ける（ただし11と22はマスターナンバーとして残す）
    while (sum > 9 && sum !== 11 && sum !== 22) {
      let newSum = 0;
      const sumString = sum.toString();
      for (let digit of sumString) {
        newSum += parseInt(digit);
      }
      sum = newSum;
    }
    
    // マスターナンバーは一桁に変換
    if (sum === 11) sum = 2;
    if (sum === 22) sum = 4;
    
    return sum;
  };

  const getCompatibility = (num1: number, num2: number): CompatibilityResult => {
    const key1 = `${num1}-${num2}`;
    const key2 = `${num2}-${num1}`;
    
    return compatibilityMatrix[key1] || compatibilityMatrix[key2] || {
      person1Number: num1,
      person2Number: num2,
      compatibilityScore: 50,
      description: 'この組み合わせの詳細な分析はまだ用意されていません。',
      advice: 'お互いを理解し、尊重し合うことが大切です。',
      rating: 'fair' as const
    };
  };

  const handleCalculate = () => {
    if (!person1Date || !person2Date) {
      alert('両方の誕生日を入力してください。');
      return;
    }

    const num1 = calculateLifeNumber(person1Date);
    const num2 = calculateLifeNumber(person2Date);
    const compatibility = getCompatibility(num1, num2);
    
    setResult(compatibility);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'challenging': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRatingText = (rating: string) => {
    switch (rating) {
      case 'excellent': return '素晴らしい相性';
      case 'good': return '良い相性';
      case 'fair': return '普通の相性';
      case 'challenging': return '努力が必要';
      default: return '不明';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <Network className="h-8 w-8 text-blue-500" />
          <h1 className="text-3xl">相性数秘術</h1>
          <Network className="h-8 w-8 text-purple-500" />
        </div>
        <p className="text-muted-foreground">
          誕生日から生命数を計算し、お二人の関係性を数秘術で診断します
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              お一人目
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="person1-name">お名前</Label>
              <Input
                id="person1-name"
                type="text"
                placeholder="例：田中太郎"
                value={person1Name}
                onChange={(e) => setPerson1Name(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="person1-date">誕生日</Label>
              <Input
                id="person1-date"
                type="date"
                value={person1Date}
                onChange={(e) => setPerson1Date(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              お二人目
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="person2-name">お名前</Label>
              <Input
                id="person2-name"
                type="text"
                placeholder="例：山田花子"
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="person2-date">誕生日</Label>
              <Input
                id="person2-date"
                type="date"
                value={person2Date}
                onChange={(e) => setPerson2Date(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button onClick={handleCalculate} size="lg" className="px-8">
          <Star className="h-5 w-5 mr-2" />
          相性を診断する
        </Button>
      </div>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-center">診断結果</CardTitle>
            <CardDescription className="text-center">
              {person1Name || '一人目'}さんと{person2Name || '二人目'}さんの相性診断
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{person1Name || '一人目'}さんの生命数</p>
                <div className="text-2xl font-bold bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  {result.person1Number}
                </div>
                <p className="text-sm">{numberMeanings[result.person1Number]}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">相性スコア</p>
                <div className="text-3xl font-bold text-blue-500">
                  {result.compatibilityScore}%
                </div>
                <Badge className={getRatingColor(result.rating)}>
                  {getRatingText(result.rating)}
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{person2Name || '二人目'}さんの生命数</p>
                <div className="text-2xl font-bold bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  {result.person2Number}
                </div>
                <p className="text-sm">{numberMeanings[result.person2Number]}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">関係性の特徴</h3>
                <p className="text-muted-foreground">{result.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">良好な関係を築くアドバイス</h3>
                <p className="text-muted-foreground">{result.advice}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}