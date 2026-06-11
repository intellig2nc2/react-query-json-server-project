import React from 'react'
import styled from 'styled-components'
import { useDashboard } from '../../store/hooks/userDashboard'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js"
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const Dashboard = () => {
    const { kpi, userRanking, productRanking } = useDashboard()

    const userChartData = {
        labels: userRanking.map(item => item.name),
        datasets: [
            {
                label: "구매 건수",
                data: userRanking.map(item => item.count),
                borderRadius: 8,
                barThickness: 18
            }
        ]
    }

    const productChartData = {
        labels: productRanking.map(item => item.name),
        datasets: [
            {
                label: "판매 수량",
                data: productRanking.map(item => item.quantity),
                borderRadius: 8,
                barThickness: 18
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: {
            legend: {
                position: "top"
            }
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: "#eeeeee"
                }
            },
            y: {
                grid: {
                    display: false
                }
            }
        }
    }

    return (
        <DashboardBlock>
            <TitleArea>
                <Title>대시보드</Title>
                <SubTitle>매출, 주문, 고객 및 상품 판매 현황을 확인할 수 있습니다.</SubTitle>
            </TitleArea>

            <KpiGrid>
                <KpiCard>
                    <KpiLabel>총 매출액</KpiLabel>
                    <KpiValue>{kpi.totalSalesAmount.toLocaleString()}원</KpiValue>
                </KpiCard>

                <KpiCard>
                    <KpiLabel>총 판매수량</KpiLabel>
                    <KpiValue>{kpi.totalQuantity.toLocaleString()}개</KpiValue>
                </KpiCard>

                <KpiCard>
                    <KpiLabel>총 주문건수</KpiLabel>
                    <KpiValue>{kpi.totalOrderCount.toLocaleString()}건</KpiValue>
                </KpiCard>

                <KpiCard>
                    <KpiLabel>고객 수</KpiLabel>
                    <KpiValue>{kpi.customerCount.toLocaleString()}명</KpiValue>
                </KpiCard>

                <KpiCard>
                    <KpiLabel>상품 수</KpiLabel>
                    <KpiValue>{kpi.productCount.toLocaleString()}개</KpiValue>
                </KpiCard>
            </KpiGrid>

            <ChartGrid>
                <ChartCard>
                    <ChartTitle>고객 구매 랭킹 TOP 10</ChartTitle>
                    <ChartBox>
                        <Bar data={userChartData} options={chartOptions} />
                    </ChartBox>
                </ChartCard>

                <ChartCard>
                    <ChartTitle>상품 판매 랭킹 TOP 10</ChartTitle>
                    <ChartBox>
                        <Bar data={productChartData} options={chartOptions} />
                    </ChartBox>
                </ChartCard>
            </ChartGrid>
        </DashboardBlock>
    )
}

export default Dashboard

const DashboardBlock = styled.div`
    padding: 32px;
    background: #f5f6fa;
    min-height: 100vh;
`

const TitleArea = styled.div`
    margin-bottom: 28px;
`

const Title = styled.h2`
    margin: 0;
    font-size: 28px;
    font-weight: 700;
    color: #222;
`

const SubTitle = styled.p`
    margin: 8px 0 0;
    font-size: 14px;
    color: #777;
`

const KpiGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 18px;
    margin-bottom: 28px;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const KpiCard = styled.div`
    background: #fff;
    border-radius: 18px;
    padding: 24px 22px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid #eee;
    transition: 0.2s;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.09);
    }
`

const KpiLabel = styled.div`
    font-size: 14px;
    color: #888;
    margin-bottom: 12px;
`

const KpiValue = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #222;
`

const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;

    @media (max-width: 1000px) {
        grid-template-columns: 1fr;
    }
`

const ChartCard = styled.div`
    background: #fff;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid #eee;
`

const ChartTitle = styled.h3`
    margin: 0 0 20px;
    font-size: 18px;
    font-weight: 700;
    color: #333;
`

const ChartBox = styled.div`
    width: 100%;
    height: 420px;
`