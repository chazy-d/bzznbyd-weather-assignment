import fs from 'fs'
import path from 'path'

describe('city weather page code splitting', () => {
  test('loads forecast UI through next/dynamic instead of the initial page bundle', () => {
    const pageSource = fs.readFileSync(
      path.join(process.cwd(), 'pages/[city].js'),
      'utf8'
    )

    expect(pageSource).toContain("from 'next/dynamic'")
    expect(pageSource).toContain(
      "import('../src/features/weather/components/ForecastList')"
    )
    expect(pageSource).not.toContain(
      "import { ForecastList } from '../src/features/weather/components/ForecastList'"
    )
  })
})
