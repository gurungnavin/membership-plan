import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Button,
  Chip,
  Box,
  Grid,
  styled,
  Card,
  CardContent,
  Slider,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox
} from '@mui/material';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { keyframes } from '@emotion/react';

const plans = [
  {
    id: 1,
    name: '無料プラン',
    color: '#342D27',
    price: 0,
    priceValue : 0,
    popular: true,
    features: {
      '受電数': '20件 ',
      '従量料金': '0円',
      '対応時間': '24時間',
      '対応ステータス管理': '〇',
      '応答内容の変更': 'ー',
      '迷惑電話を登録': 'ー',
    }
  },
  {
    id: 2,
    name: 'スタンダード',
    color: '#E761A4',
    price: "1,500/月",
    priceValue : 1500,
    popular: true,
    features: {
      '受電数': '50件 ',
      '従量料金': '50円',
      '対応時間': '24時間',
      '対応ステータス管理': '〇',
      '応答内容の変更': 'ー',
      '迷惑電話を登録': 'ー',
    }
  },
  {
    id: 3,
    name: 'ビジネス',
    color: '#ffb300',
    price: "9,800/月",
    priceValue : 9800,
    features: {
      '受電数': '150件 ',
      '従量料金': '50円',
      '対応時間': '24時間',
      '対応ステータス管理': '〇',
      '応答内容の変更': '〇',
      '迷惑電話を登録': '〇',
    }
  }
];

const durationAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// card hover or selected of free, standard and business
const DurationButton = styled(Button)(({ theme, selected, color }) => ({
  border: `1px solid ${color}`,
  margin: theme.spacing(0.5),
  ...(selected && {
    backgroundColor: color,
    color: theme.palette.getContrastText(color),
    '&:hover': {
      backgroundColor: color,
    }
  })
}));

const PlanCard = ({ plan, isActive, onSelect }) => {
  return (
    <Paper
      elevation={isActive ? 3 : 1}
      sx={{
        p: 3,
        m: 1,
        background: isActive ? plan.color : 'transparent',
        color: isActive ? 'white' : "#342D27",
        position: 'relative',
        minWidth: 280,
        minHeight: 450, // Ensure equal height for all cards
        transition: 'transform 0.4s',
        transform: isActive ? 'scale(1.03)' : 'scale(1)',
      }}
    >
      {plan.popular && (
        <Chip
          label="人気プラン"
          sx={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: isActive ? 'white' : plan.color,
            color: isActive ? plan.color : 'white',
            border: isActive ? `1px solid ${plan.color}` : '',
          }}
        />
      )}

      {plan.price === 0 && (
        <Chip
          label="2週間無料で使ってみる"
          sx={{
            position: 'absolute',
            top: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: isActive ? 'white' : plan.color,
            color: isActive ? plan.color : 'white',
            border: isActive ? `1px solid ${plan.color}` : '',
          }}
        />
      )}



      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h5" sx={{ color: isActive ? 'white' : plan.color }}>
          {plan.name}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold', my: 2 }}>
          ¥{plan.price.toLocaleString()}
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        {Object.entries(plan.features).map(([key, value]) => (
          <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', py: 1, }}>
            <Typography variant="body2">{key}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', color: isActive ? 'white' : 'black' }}>
              {value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Button
        fullWidth
        variant="contained"
        sx={{
          color: isActive ? plan.color : 'white',
          bgcolor: isActive ? 'white' : plan.color,
          fontWeight: 'bold'
        }}
        onClick={() => onSelect(plan.id)}
      >
        今すぐ始める
      </Button>
    </Paper>
  );
};

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Free Plan (ID 1)
  const [duration, setDuration] = useState('2month'); // Default to '2months'
  
  let membershipPlans = plans[selectedPlan-1].priceValue
  // console.log(test);
 

  const calculateDiscount = () => {
    const discountPercentage = getDiscountPercentage(duration);
    return discountPercentage;
  };



  // Options section

  const [selectedOptions, setSelectedOptions] = useState({
    callback: false,
    sms: false,
    numberChange: false,
  });
  const [numberTier, setNumberTier] = useState('hoshi');
  const [selectedValue, setSelectedValue] = useState(null);
  const options = [
    { label: 'ほし番号: 300円/月', value: 300 },
    { label: 'あめ番号: 2,000円/月', value: 2000 },
    { label: 'ゆにこーん番号：8000円/月', value: 8000 },
  ];

  const handleSelect = (value) => {
    if (selectedValue === value) {
      setSelectedValue(null); // Uncheck if it's already selected
    } else {
      setSelectedValue(value); // Otherwise, select it
    }
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedOptions.callback) total += 300;
    if (selectedOptions.sms) total += 300;
    if (selectedOptions.numberChange) {
      total += {
        hoshi: 300,
        ame: 2000,
        unicorn: 8000,
      }[numberTier];
    }
    return total
  };

  const total = (calculateTotal() + membershipPlans) * duration
  const hasSelectedOptions = Object.values(selectedOptions).some(Boolean);

  


  return (
    <div className='flex flex-col items-center overflow-x-hidden'>
      <Box sx={{ maxWidth: 1060, mx: 'auto', my: 2, py: 4, background: "white", display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowX: 'hidden' }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
          料金プラン
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
          <Grid container justifyContent="center" spacing={1}>
            {plans.map((plan) => (
              <Grid item key={plan.id} xs={12} sm={6} md={4}>
                <PlanCard
                  plan={plan}
                  isActive={selectedPlan === plan.id}
                  onSelect={setSelectedPlan}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <h3 className='self-end pt-3'>※料金は全て税別価格です。</h3>
      </Box>


      <div>
        <h1 className='bg-[#ffb1d8] font-extrabold text-xl px-8 py-3 rounded-2xl'>便利な追加機能で電話対応をもっと快適に！</h1>
      </div>

      {/* option section */}

      <div className="max-w-[900px] max-h-auto mx-auto my-8 p-12 space-y-4 flex flex-col border-2 border-[#E761A4] rounded-xl text-center">
        {/* Title Section */}
        <div>
          <Typography variant="h2" component="div" gutterBottom
            sx={{
              fontSize: '30px',
              fontWeight: '600',
              color: '#E761A4',
            }}>
            あいてむ(オプション機能)
          </Typography>
          <Typography variant="subtitle1" color="text.secondary"
            sx={{ fontSize: '18px', fontWeight: 'bold' }}>
            マイヤ登録後、マイページから選択可能です
          </Typography>
        </div>

        {/* Three Cards Row */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 - Callback */}
          <Card
            className={`flex-1 cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-300 ${selectedOptions.callback ? 'border-2 border-[#E761A4]' : ''}`}
            onClick={() => setSelectedOptions(prev => ({ ...prev, callback: !prev.callback }))}
          >
            {/* Crystal Border Animation */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent">
              <div className="absolute inset-0 animate-crystal-effect rounded-2xl border-[3px] border-transparent"></div>
            </div>

            <CardContent className="relative z-10 p-6 bg-white rounded-2xl">
              <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                もしもしコール
              </Typography>
              <Typography variant="body1" gutterBottom>
                (折り返し発信)
              </Typography>
              <PhoneForwardedIcon sx={{ color: '#E761A4', fontSize: "85px", marginBlock: '15px' }} />
              <Typography variant="body1" gutterBottom sx={{ marginBottom: '14px' }}>
                着信のあった番号へ <br />
                折り返し発信
              </Typography>
              <List sx={{ textAlign: 'start' }}>
                <ListItemText sx={{
                  fontSize: '1px',
                  color: 'white',
                  cursor: 'pointer',
                  backgroundColor: '#E761A4',
                  transition: '0.3s'
                }
                }
                >▸基本料金: 300円/月
                </ListItemText>
                <ListItemText sx={{
                  fontSize: '1px',
                  color: 'white',
                  cursor: 'pointer',
                  backgroundColor: '#E761A4',
                  transition: '0.3s'
                }
                }
                >▸従量料金: 固定電話0.2円/秒
                </ListItemText>
                <ListItemText sx={{
                  fontSize: '1px',
                  color: 'white',
                  cursor: 'pointer',
                  backgroundColor: '#E761A4',
                  transition: '0.3s'
                }
                }
                >▸携帯電話0.4円/秒
                </ListItemText>
              </List>
            </CardContent>
          </Card>

          {/* Card 2 - SMS */}
          <Card
            className={`flex-1 cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-300 ${selectedOptions.sms ? 'border-2 border-[#E761A4]' : ''}`}
            onClick={() => setSelectedOptions(prev => ({ ...prev, sms: !prev.sms }))}
          >
            {/* Crystal Border Animation */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent">
              <div className="absolute inset-0 animate-crystal-effect rounded-2xl border-[3px] border-transparent"></div>
            </div>

            <CardContent className="relative z-10 p-6 bg-white rounded-2xl">
              <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                おてがみ送信
              </Typography>
              <Typography variant="body1" gutterBottom>
                (SMS発信)
              </Typography>
              <MailOutlineIcon sx={{ color: '#E761A4', fontSize: "85px", marginBlock: '15px' }} />
              <Typography variant="body1" gutterBottom sx={{ marginBottom: '14px' }}>
                着信のあった番号へ <br />
                SMS送信 <br />
                (メッセージ固定)
              </Typography>
              <List sx={{ textAlign: 'start' }}>
                <ListItemText sx={{
                  fontSize: '1px',
                  color: 'white',
                  cursor: 'pointer',
                  backgroundColor: '#E761A4',
                  transition: '0.3s'
                }
                }
                >▸基本料金: 300円/月
                </ListItemText>
                <ListItemText sx={{
                  fontSize: '1px',
                  color: 'white',
                  cursor: 'pointer',
                  backgroundColor: '#E761A4',
                  transition: '0.3s'
                }
                }
                >▸従量料金: 20円/秒
                </ListItemText>
              </List>
            </CardContent>
          </Card>


          {/* Card 3 - numberChange */}
          <Card
            className={`flex-1 cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-300 ${selectedOptions.numberChange || selectedValue > 0 ? 'border-2 border-[#E761A4]' : ''}`}
            onClick={() => setSelectedOptions(prev => ({ ...prev, numberChange: !prev.numberChange }))}
          >
            {/* Crystal Border Animation */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl border-2 border-transparent">
              <div className="absolute inset-0 animate-crystal-effect rounded-2xl border-[3px] border-transparent"></div>
            </div>

            <CardContent className="relative z-10 p-6 bg-white rounded-2xl">
              <Typography variant="h6" gutterBottom sx={{ fontWeight: '600' }}>
                電話番号の変更
              </Typography>
              <DialpadIcon sx={{ color: '#E761A4', fontSize: "85px", marginBlock: '15px' }} />
              <Typography variant="body1" gutterBottom sx={{ marginBottom: '14px' }}>
                マイヤが応答する<br />
                050の電話番号を変更
              </Typography>
              <List sx={{ textAlign: 'start' }}>
                {options.map((option) => (
                  <ListItem
                    key={option.value}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #E761A4',
                      borderRadius: '5px',
                      marginBottom: '5px',
                      transition: '0.3s',
                    }}
                  >
                    <Checkbox
                      checked={selectedValue === option.value}
                      onChange={() => handleSelect(option.value)}
                      sx={{color : '#E761A4'}}
                    />
                    <Typography sx={{ color: '#E761A4', fontSize: '12px' }}>
                      {option.label}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </div>
      </div>




      <div className="max-w-[900px] max-h-[610px] mx-auto my-8 p-12 space-y-4 flex flex-col border-2 border-[#E761A4] rounded-xl text-center">
        {/* Conditionally display duration selector only when options are selected */}
        {hasSelectedOptions && (
          <div className="mt-4">
            <Typography gutterBottom>契約期間 ({duration}ヶ月)</Typography>
            <Slider
              sx={{ color: "#E761A4" }}
              value={duration}
              onChange={(_, value) => setDuration(value)}
              min={1}
              max={12}
              step={1}
              marks={[
                { value: 1, label: '1ヶ月' },
                { value: 2, label: '2ヶ月' },
                { value: 6, label: '6ヶ月' },
                { value: 12, label: '1年' },
              ]}
            />
          </div>
        )}

        <div className='max-w-[900px] max-h-[610px]'>
          {/* Total Price */}
          <Typography variant="h5" className="">
            合計金額: {total > 0 ? total.toLocaleString() : 0 }円 (税別)
          </Typography>

          {/* Additional Information */}
          <Typography variant="body2" sx={{ maxWidth: '750px', marginBlock: '10px' }}>
            スタンダードプラン、ビジネスプランは月額基本料金に含まれる月間の受電数を超えると、
            従量料金として1件あたり50円（税別）が上乗せとなります。
          </Typography>

          {/* Trial Button */}
          <Button
            onClick={() => window.location.href = "https://my.mayai.jp/signup?_gl=1%2ago0o5d%2a_gcl_aw%2aR0NMLjE3NDE2ODMyOTguQ2owS0NRandtN3EtQmhEUkFSSXNBQ0Q2LWZYNDBEaFhJTGJ6OXlCbTZWb1otd05HMjlCNGxuN2VPRWtZQ2hkbUpsRl9IM0tUN0ZldlhTWWFBaml5RUFMd193Y0I.%2a_gcl_au%2aMzk4NTAyNTk4LjE3Mzc5NjUwNDA.&_ga=2.30745399.946743939.1741581702-1040683374.1737965041&_gac=1.195903070.1741683298.Cj0KCQjwm7q-BhDRARIsACD6-fX40DhXILbz9yBm6VoZ-wNG29B4ln7eOEkYChdmJlF_H3KT7FevXSYaAjiyEALw_wcB"}
            variant="contained"
            fullWidth
            className="mt-4"
            sx={{ background: '#E761A4', maxWidth: '300px', marginBlock: '15px' }}
          >
            {total > 0 ? '導入' : '2週間無料で使ってみる'}
          </Button>

          {/* Disclaimer */}
          <Typography variant="caption" display="block" className="mt-4">
            ※マヤイが応答する番号が発行されるため、既にお持ちの電話番号で利用する場合は転送設定が必要です。
          </Typography>
          <Typography variant="caption" display="block">
            ※料金は全て税別価格です。
          </Typography>
        </div>

      </div>


    </div>
  );
}
