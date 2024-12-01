import React from 'react';
import { ShiftDistribution } from '../types/types';

interface Props {
  distribution: ShiftDistribution;
  onChange: (newDistribution: ShiftDistribution) => void;
}

export const ShiftDistributionSlider: React.FC<Props> = ({ distribution, onChange }) => {
  const handleChange = (shift: keyof ShiftDistribution, value: number) => {
    const newDistribution = { ...distribution, [shift]: value };
    const total = newDistribution.morning + newDistribution.evening + newDistribution.night;
    
    // Normalize to ensure total is 100
    if (total > 0) {
      onChange({
        morning: Math.round((newDistribution.morning / total) * 100),
        evening: Math.round((newDistribution.evening / total) * 100),
        night: Math.round((newDistribution.night / total) * 100),
      });
    }
  };

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Vardiya Dağılımı</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sabah Vardiyası ({distribution.morning}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={distribution.morning}
            onChange={(e) => handleChange('morning', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Akşam Vardiyası ({distribution.evening}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={distribution.evening}
            onChange={(e) => handleChange('evening', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gece Vardiyası ({distribution.night}%)
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={distribution.night}
            onChange={(e) => handleChange('night', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};