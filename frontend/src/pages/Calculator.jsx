import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import Nav from '../components/Nav';
import { getAverages, getAiInsight } from '../services/api';

Chart.register(...registerables);

// ── Major lists per university (mirrors calculator.ejs) ───────────────────
const MAJORS_BY_UNIVERSITY = {
  1: [
    { id: 1,  name: 'Chemical Engineering' },
    { id: 2,  name: 'Mechanical Engineering' },
    { id: 3,  name: 'Civil Engineering' },
    { id: 4,  name: 'Electrical Engineering' },
    { id: 5,  name: 'Computer Engineering' },
    { id: 10, name: 'Computer Science' },
    { id: 13, name: 'Architectural Engineering - Waterloo' },
    { id: 14, name: 'Biomedical Engineering - Waterloo' },
    { id: 15, name: 'Geological Engineering - Waterloo' },
    { id: 16, name: 'Environmental Engineering - Waterloo' },
    { id: 17, name: 'Management Engineering - Waterloo' },
    { id: 18, name: 'Mechatronics Engineering - Waterloo' },
    { id: 19, name: 'Nanotechnology Engineering - Waterloo' },
    { id: 20, name: 'Software Engineering - Waterloo' },
    { id: 21, name: 'System Design Engineering - Waterloo' },
    { id: 22, name: 'Math + Business Administration - Waterloo' },
    { id: 23, name: 'Computer Science + Business Administration - Waterloo' },
    { id: 24, name: 'Math - Waterloo' },
    { id: 25, name: 'Computing + Financial Management - Waterloo' },
    { id: 26, name: 'Math/FARM - Waterloo' },
  ],
  2: [
    { id: 10, name: 'Computer Science' },
    { id: 27, name: 'Health Sciences' },
    { id: 28, name: 'Medical Sciences' },
    { id: 29, name: 'Management + Organizational Studies' },
    { id: 30, name: 'Ivey Business' },
    { id: 32, name: 'General Engineering' },
  ],
  3: [
    { id: 27, name: 'Health Sciences' },
    { id: 31, name: 'Commerce' },
    { id: 32, name: 'General Engineering' },
  ],
  4: [
    { id: 1,  name: 'Chemical Engineering' },
    { id: 2,  name: 'Mechanical Engineering' },
    { id: 3,  name: 'Civil Engineering' },
    { id: 4,  name: 'Electrical Engineering' },
    { id: 5,  name: 'Computer Engineering' },
    { id: 6,  name: 'Engineering Science' },
    { id: 33, name: 'TrackOne Engineering' },
    { id: 7,  name: 'Industrial Engineering' },
    { id: 8,  name: 'Materials Engineering' },
    { id: 9,  name: 'Mineral Engineering' },
    { id: 10, name: 'Computer Science' },
    { id: 11, name: 'Life Science' },
    { id: 12, name: 'Rotman Commerce' },
  ],
};

const UNIVERSITY_NAMES = {
  1: 'University of Waterloo',
  2: 'Western University',
  3: "Queen's University",
  4: 'University of Toronto',
};

const CHART_LABELS = [
  'Sample1','Sample2','Sample3','Sample4','Sample5','Sample6',
  'Sample7','Sample8','Sample9','Sample10','Sample11',
];

export default function Calculator() {
  const canvasRef        = useRef(null);
  const chartRef         = useRef(null);

  const [universityId,   setUniversityId]   = useState('');
  const [majorId,        setMajorId]        = useState('');
  const [userAverage,    setUserAverage]    = useState('');
  const [result,         setResult]         = useState('');
  const [notes,          setNotes]          = useState('');
  const [aiInsight,      setAiInsight]      = useState('Enter your details above and click "Check Chances" to see insights.');
  const [aiLoading,      setAiLoading]      = useState(false);
  const [programMean,    setProgramMean]    = useState(null);
  const [programNotes,   setProgramNotes]   = useState(null);

  // ── Initialise chart once ────────────────────────────────────────────────
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: CHART_LABELS,
        datasets: [{
          label: 'Admission Averages',
          data: new Array(CHART_LABELS.length).fill(0),
          backgroundColor: '#4a90e2',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { font: { size: 16 } } },
          title: { display: true, text: 'Admission Averages by Year', font: { size: 20 } },
        },
        scales: {
          x: { ticks: { font: { size: 14 } }, grid: { color: '#ddd' } },
          y: { min: 0, max: 100, ticks: { font: { size: 14 } }, grid: { color: '#ddd' } },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, []);

  // ── Fetch averages when both selects are filled ──────────────────────────
  useEffect(() => {
    if (!universityId || !majorId) return;

    getAverages(universityId, majorId)
      .then(({ data }) => {
        const averages = [
          data.avg1  || 0, data.avg2  || 0, data.avg3  || 0, data.avg4  || 0,
          data.avg5  || 0, data.avg6  || 0, data.avg7  || 0, data.avg8  || 0,
          data.avg9  || 0, data.avg10 || 0, data.avg11 || 0,
        ];
        chartRef.current.data.datasets[0].data = averages;
        chartRef.current.update();

        const mean = averages.reduce((a, v) => a + v, 0) / averages.length;
        setProgramMean(mean);
        setProgramNotes(data.notes);
        setResult('');
        setNotes('');
      })
      .catch(() => {
        chartRef.current.data.datasets[0].data = new Array(CHART_LABELS.length).fill(0);
        chartRef.current.update();
        setProgramMean(null);
        setProgramNotes(null);
      });
  }, [universityId, majorId]);

  // ── Reset major when university changes ──────────────────────────────────
  const handleUniversityChange = (e) => {
    setUniversityId(e.target.value);
    setMajorId('');
    setResult('');
    setNotes('');
    setProgramMean(null);
    if (chartRef.current) {
      chartRef.current.data.datasets[0].data = new Array(CHART_LABELS.length).fill(0);
      chartRef.current.update();
    }
  };

  // ── Check chances + AI insight ───────────────────────────────────────────
  const handleCheckChances = async () => {
    if (!programMean) {
      setResult('Please select a university and major first.');
      setNotes('');
      return;
    }
    if (isNaN(userAverage) || userAverage === '') {
      setResult('Please enter a valid number for your average.');
      setNotes('');
      return;
    }

    const avg = parseFloat(userAverage);
    if (avg >= programMean) {
      setResult(`You have a good chance! Program mean is ${programMean.toFixed(2)}%.`);
    } else {
      setResult(`It might be competitive. Program mean is ${programMean.toFixed(2)}%.`);
    }

    setNotes(
      programNotes && programNotes !== 'N/A' ? `Note: ${programNotes}` : ''
    );

    // AI insight
    setAiLoading(true);
    setAiInsight('');
    try {
      const uniName   = UNIVERSITY_NAMES[Number(universityId)] || universityId;
      const majorName = (MAJORS_BY_UNIVERSITY[universityId] || [])
        .find((m) => String(m.id) === String(majorId))?.name || majorId;

      const { data } = await getAiInsight({
        university:  uniName,
        major:       majorName,
        userAverage: avg,
        programMean,
      });
      setAiInsight(data.insight);
    } catch {
      setAiInsight('AI insight generation failed. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const availableMajors = MAJORS_BY_UNIVERSITY[universityId] || [];

  return (
    <>
      <link rel="stylesheet" href="/calculator_style.css" />
      <Nav activePage="calculator" />

      <h1>Calculate Your Chances of Admission</h1>

      {/* University select */}
      <div>
        <label htmlFor="university_select">Choose a University:</label>
        <select
          id="university_select"
          value={universityId}
          onChange={handleUniversityChange}
        >
          <option value="">--Please choose an option--</option>
          <option value="4">University of Toronto</option>
          <option value="1">University of Waterloo</option>
          <option value="2">Western University</option>
          <option value="3">Queens University</option>
        </select>
      </div>

      {/* Major select */}
      <div>
        <label htmlFor="major_select">Choose a Major:</label>
        <select
          id="major_select"
          value={majorId}
          onChange={(e) => setMajorId(e.target.value)}
          disabled={!universityId}
        >
          <option value="">
            {universityId ? '--Please choose an option--' : '--Please choose a university first--'}
          </option>
          {availableMajors.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      {/* Chart + AI panel */}
      <div className="calculator-flex-container">
        {/* Chart */}
        <div>
          <canvas
            ref={canvasRef}
            id="averagesChart"
            width={600}
            height={400}
            style={{ marginTop: 30 }}
          />
        </div>

        {/* Right panel */}
        <div className="ai-insight">
          <div className="input-section">
            <label htmlFor="user_average">Enter Your Average:</label>
            <input
              type="text"
              id="user_average"
              value={userAverage}
              onChange={(e) => setUserAverage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCheckChances()}
            />
            <button type="button" onClick={handleCheckChances}>
              Check Chances
            </button>
            {result && <p id="result">{result}</p>}
            {notes  && <p id="notes" style={{ color: 'gray' }}>{notes}</p>}
          </div>

          <div id="ai-insight-box" className="ai-insight">
            <h2>AI Admission Insight</h2>
            {aiLoading && (
              <p id="loading-spinner">
                <i className="fas fa-star loading-star" />
                {' '}Generating insight...
              </p>
            )}
            {!aiLoading && (
              <p id="ai-insight-text">{aiInsight}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}