import { useState } from 'react';
import LuHeader from './Lu/LuHeader';
import LuMessages from './Lu/LuMessages';
import LuInput from './Lu/LuInput';
import './Lu.css';

export default function LuInterface() {
  const [messages, setMessages] = useState([
    {
      text: "Hello, I'm Lu. Click if I can assist!",
      sender: 'lu',
      timestamp: new Date(),
      loading: false
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const calculatePowerConsumption = () => {
    // Napi használati idők (órában)
    const idleHours = 2;
    const seriesHours = 8;
    const codingHours = 6;
    const gamingHoursPerDay = 2;
    const phoneCharging = 5;
    const all = idleHours + seriesHours + codingHours + gamingHoursPerDay;

    // Tevékenységenkénti fogyasztás Wattban
    const idlePower = 36;   // CPU+GPU+monitor kb. idle állapotban
    const seriesPower = 65; // sorozatnézés közben
    const codingPower = 68; // programozás közben
    const gamingPower = 95; // játék közben
    const monitor = 30;
    const plusCost = 40;
    const phoneCharge = 60;

    // Energiafogyasztás Wh-ban tevékenységenként
    const idleEnergy = idleHours * idlePower;
    const seriesEnergy = seriesHours * seriesPower;
    const codingEnergy = codingHours * codingPower;
    const gamingEnergy = gamingHoursPerDay * gamingPower;
    const monitorEnergy = all * monitor;
    const plusCostEnergy = all * plusCost;
    const phoneChargingEnergy = phoneCharge * phoneCharging;

    // Teljes napi energia Wh-ban és kWh-ban
    const totalDailyEnergyWh = idleEnergy + seriesEnergy + codingEnergy + gamingEnergy + monitorEnergy + plusCostEnergy ;
    const totalDailyEnergyWhWphone = idleEnergy + seriesEnergy + codingEnergy + gamingEnergy + monitorEnergy + plusCostEnergy + phoneChargingEnergy;
    const totalDailyEnergyKwh = totalDailyEnergyWh / 1000;
    const totalDailyEnergyKwhWphone = totalDailyEnergyWhWphone / 1000;

    // Tarifák Ft/kWh
    const a1Tariff = 36;
    const a2Tariff = 70;

    // Költségek
    const dailyCostA1 = totalDailyEnergyKwh * a1Tariff;
    const dailyCostA2 = totalDailyEnergyKwh * a2Tariff;

    const dailyCostA1WPhone = totalDailyEnergyKwhWphone * a1Tariff;
    const dailyCostA2Wphone = totalDailyEnergyKwhWphone * a2Tariff;

    // Heti és havi értékek
    const weeklyEnergyKwh = totalDailyEnergyKwh * 7;
    const monthlyEnergyKwh = totalDailyEnergyKwh * 30; 

    const weeklyCostA1 = dailyCostA1 * 7;
    const monthlyCostA1 = dailyCostA1 * 30;

    const weeklyCostA2 = dailyCostA2 * 7;
    const monthlyCostA2 = dailyCostA2 * 30;

    const monthlyCostA1WP = dailyCostA1WPhone * 30;
    const monthlyCostA2WP = dailyCostA2Wphone * 30;

    return {
      dailyEnergyKwh: totalDailyEnergyKwh.toFixed(3),
      weeklyEnergyKwh: weeklyEnergyKwh.toFixed(3),
      monthlyEnergyKwh: monthlyEnergyKwh.toFixed(3),
      dailyCostA1: dailyCostA1.toFixed(2),
      weeklyCostA1: weeklyCostA1.toFixed(2),
      monthlyCostA1: monthlyCostA1.toFixed(2),
      dailyCostA2: dailyCostA2.toFixed(2),
      weeklyCostA2: weeklyCostA2.toFixed(2),
      monthlyCostA2: monthlyCostA2.toFixed(2),
      monthlyCostA2WP: monthlyCostA2WP.toFixed(2),
      monthlyCostA1WP: monthlyCostA1WP.toFixed(2),
      usageBreakdown: {
        idleHours,
        seriesHours,
        codingHours,
        gamingHoursPerDay: gamingHoursPerDay.toFixed(1),
        totalHours: (idleHours + seriesHours + codingHours + gamingHoursPerDay).toFixed(1)
      }
    };
  };

  const handleSend = async (input) => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
      loading: false
    };

    setMessages(prev => [...prev, userMessage, {
      text: '',
      sender: 'lu',
      timestamp: new Date(),
      loading: true
    }]);

    // Check if the input matches our trigger phrase
    if (
       (
        input.toLowerCase().includes('számold ki') || 
        input.toLowerCase().includes('szamold ki') ||  
        input.toLowerCase().includes('mennyit') || 
        input.toLowerCase().includes('mennyi lehet a') || 
        input.toLowerCase().includes('mennyi')
      ) && (
        input.toLowerCase().includes('gepem') || 
        input.toLowerCase().includes('gépem') || 
        input.toLowerCase().includes('gpen') || 
        input.toLowerCase().includes('pc-m') || 
        input.toLowerCase().includes('pcm')
      ) && (
        input.toLowerCase().includes('fogyaszt') || 
        input.toLowerCase().includes('fogyasztása') || 
        input.toLowerCase().includes('fogyasztasa')
      ) || (
      input.toLowerCase().includes('power') || 
      input.toLowerCase().includes('fogyaszt') ||
      input.toLowerCase().includes('energia') ||
      input.toLowerCase().includes('calculate') ||
      input.toLowerCase().includes('pc') ||
      input.toLowerCase().includes('computer') ||
      input.toLowerCase().includes('gép') ||
      input.toLowerCase().includes('gépet') ||
      input.toLowerCase().includes('számol') ||
      input.toLowerCase().includes('számíts')   )) 
      
      {
    setTimeout(() => {
      const results = calculatePowerConsumption();

      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          text: (
            <div className="power-consumption-results">
              <p className="font-bold mb-2">💻 Számítógép energiafogyasztás elemzés:</p>

              <div className="mb-3">
                <p className="font-semibold">⏳ Napi használati adatok:</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Üresjárat: {results.usageBreakdown.idleHours} óra</li>
                  <li>Sorozatnézés: {results.usageBreakdown.seriesHours} óra</li>
                  <li>Programozás: {results.usageBreakdown.codingHours} óra</li>
                  <li>Játék: {results.usageBreakdown.gamingHoursPerDay} óra</li>
                  <li>Összesen: ~{results.usageBreakdown.totalHours} óra/nap</li>
                </ul>
              </div>

              <div className="mb-3">
                <p className="font-semibold">⚡ Energiafogyasztás:</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Napi: {results.dailyEnergyKwh} kWh</li>
                  <li>Heti: {results.weeklyEnergyKwh} kWh</li>
                  <li>Havi: {results.monthlyEnergyKwh} kWh</li>
                </ul>
              </div>

              <div className="mb-3">
                <p className="font-semibold">💰 Költség (A1 tarifa - 36 Ft/kWh):</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Napi: {results.dailyCostA1} Ft</li>
                  <li>Heti: {results.weeklyCostA1} Ft</li>
                  <li>Havi: {results.monthlyCostA1} Ft</li>
                  <li>(Havi with plus: {results.monthlyCostA1WP} Ft)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold">💰 Költség (A2 tarifa - 70 Ft/kWh):</p>
                <ul className="list-disc pl-5 text-sm">
                  <li>Napi: {results.dailyCostA2} Ft</li>
                  <li>Heti: {results.weeklyCostA2} Ft</li>
                  <li>Havi: {results.monthlyCostA2} Ft</li>
                   <li>(Havi with plus: {results.monthlyCostA2WP} Ft)</li>
                </ul>
              </div>

              <p className="text-xs mt-3 text-gray-300">
                * Számítás alapja: tevékenység-alapú Watt értékek
              </p>
            </div>
          ),
          sender: 'lu',
          timestamp: new Date(),
          loading: false
        };
        return newMessages;
      });
    }, 1000);
  } else {
    // Default response for other inputs
    setTimeout(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          text: (
            <>
              I received: "{input}". <br /><br />
              This would be the AI response in production if Szabolcs would make me already &gt;(.
            </>
          ),
          sender: 'lu',
          timestamp: new Date(),
          loading: false
        };
        return newMessages;
      });
    }, 1000);
}
  };

const toggleMinimize = () => {
  setIsMinimized(!isMinimized);
};

return (
  <div className={`lu-interface bg-gray-800 ${isMinimized ? 'lu-minimized' : ''}`}>
    <LuHeader
      isListening={isListening}
      onVoiceToggle={() => setIsListening(!isListening)}
      onMinimizeToggle={toggleMinimize}
      isMinimized={isMinimized}
    />
    {!isMinimized && (
      <>
        <LuMessages messages={messages} />
        <LuInput
          onSend={handleSend}
          isListening={isListening}
          onVoiceToggle={() => setIsListening(!isListening)}
        />
      </>
    )}
  </div>
);
}